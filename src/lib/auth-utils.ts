interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export const cookieUtils = {
  set(name: string, value: string, options: CookieOptions = {}): void {
    const defaults: CookieOptions = {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'lax',
      maxAge: 8 * 24 * 60 * 60
    };
    const finalOptions = { ...defaults, ...options };
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (finalOptions.maxAge !== undefined) cookieString += `; max-age=${finalOptions.maxAge}`;
    if (finalOptions.expires) cookieString += `; expires=${finalOptions.expires.toUTCString()}`;
    if (finalOptions.path) cookieString += `; path=${finalOptions.path}`;
    if (finalOptions.domain) cookieString += `; domain=${finalOptions.domain}`;
    if (finalOptions.secure) cookieString += '; secure';
    if (finalOptions.sameSite) cookieString += `; samesite=${finalOptions.sameSite}`;

    document.cookie = cookieString;
  },

  get(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    for (const cookie of document.cookie.split(';')) {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
  },

  remove(name: string, options: Partial<CookieOptions> = {}): void {
    this.set(name, '', { ...options, expires: new Date(0), maxAge: -1 });
  },

  exists(name: string): boolean {
    return this.get(name) !== null;
  }
};

export const jwtUtils = {
  decodePayload(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
      return JSON.parse(atob(paddedPayload));
    } catch (error) {
      console.error('Error decoding JWT payload:', error);
      return null;
    }
  },

  isExpired(token: string): boolean {
    const payload = this.decodePayload(token);
    return !payload?.exp || payload.exp * 1000 < Date.now();
  },

  getUsername(token: string): string | null {
    return this.decodePayload(token)?.username || null;
  },

  getStatus(token: string): string | null {
    return this.decodePayload(token)?.status || null;
  },

  getExpiry(token: string): number | null {
    return this.decodePayload(token)?.exp || null;
  },

  needsRenewal(token: string): boolean {
    const payload = this.decodePayload(token);
    if (!payload?.exp) return false;
    const exp = payload.exp * 1000;
    const now = Date.now();
    return exp - now <= 24 * 60 * 60 * 1000 && exp > now;
  },

  getTimeUntilExpiration(token: string): number {
    const payload = this.decodePayload(token);
    if (!payload?.exp) return 0;
    return Math.max(0, payload.exp * 1000 - Date.now());
  }
};

export const authToken = {
  COOKIE_NAME: 'auth_token',

  set(token: string): void {
    const payload = jwtUtils.decodePayload(token);
    if (payload?.exp) {
      const expiresDate = new Date(payload.exp * 1000);
      const maxAge = payload.exp - Math.floor(Date.now() / 1000);
      cookieUtils.set(this.COOKIE_NAME, token, { expires: expiresDate, maxAge });
    } else {
      cookieUtils.set(this.COOKIE_NAME, token);
    }
  },

  get(): string | null { return cookieUtils.get(this.COOKIE_NAME); },
  remove(): void { cookieUtils.remove(this.COOKIE_NAME); },
  exists(): boolean {
    const token = this.get();
    return token !== null && !jwtUtils.isExpired(token);
  },
  getUsername(): string | null {
    const token = this.get();
    return token ? jwtUtils.getUsername(token) : null;
  },
  getStatus(): string | null {
    const token = this.get();
    return token ? jwtUtils.getStatus(token) : null;
  },
  getExpiry(): number | null {
    const token = this.get();
    return token ? jwtUtils.getExpiry(token) : null;
  },
  needsRenewal(): boolean {
    const token = this.get();
    return token ? jwtUtils.needsRenewal(token) : false;
  },

  async renewToken(): Promise<{ success: boolean; message: string; token?: string }> {
    const currentToken = this.get();
    if (!currentToken) return { success: false, message: 'No token to renew' };

    // Relative URL keeps /dev isolated from production.
    try {
      const response = await fetch('api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentToken}` },
        body: JSON.stringify({ action: 'renew', token: currentToken })
      });
      const data = await response.json();

      if (response.ok && data.success && data.token) {
        this.set(data.token);
        return { success: true, message: data.message, token: data.token };
      }
      return { success: false, message: data.message || 'Token renewal failed' };
    } catch (error) {
      console.error('Token renewal error:', error);
      return { success: false, message: 'Network error during token renewal' };
    }
  },

  async autoRenew(): Promise<boolean> {
    if (this.needsRenewal()) return (await this.renewToken()).success;
    return true;
  }
};

export const httpUtils = {
  getAuthHeaders(): Record<string, string> {
    const token = authToken.get();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  },

  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = authToken.get();
    const headers: Record<string, string> = { ...(options.headers as Record<string, string> || {}) };
    if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(url, { ...options, headers });
  },

  async post(url: string, data: any, options: RequestInit = {}): Promise<Response> {
    return this.authenticatedFetch(url, { method: 'POST', body: JSON.stringify(data), ...options });
  },
  async delete(url: string, data?: any, options: RequestInit = {}): Promise<Response> {
    const requestOptions: RequestInit = { method: 'DELETE', ...options };
    if (data) requestOptions.body = JSON.stringify(data);
    return this.authenticatedFetch(url, requestOptions);
  },
  async put(url: string, data: any, options: RequestInit = {}): Promise<Response> {
    return this.authenticatedFetch(url, { method: 'PUT', body: JSON.stringify(data), ...options });
  },
  async patch(url: string, data: any, options: RequestInit = {}): Promise<Response> {
    return this.authenticatedFetch(url, { method: 'PATCH', body: JSON.stringify(data), ...options });
  }
};
