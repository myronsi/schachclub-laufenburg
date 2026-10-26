import { authToken, jwtUtils } from '@/lib/auth-utils';

// Relative API URL: production uses /api, while /dev uses /dev/api.
const AUTH_API_URL = 'api/auth.php';

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  status?: string;
  username?: string;
  must_change_password?: boolean;
  expires_at?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  status: string | null;
  mustChangePassword: boolean;
  isBlocked: boolean;
}

export const storeAuth = (token: string) => authToken.set(token);
export const clearAuth = () => authToken.remove();
export const getToken = (): string | null => authToken.get();
export const getUsername = (): string | null => authToken.getUsername();

const shouldRenewToken = (): boolean => authToken.needsRenewal();

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, action: 'login' })
    });
    const data: AuthResponse = await response.json();

    if (response.ok && data.success && data.token) storeAuth(data.token);
    return data;
  } catch (error: any) {
    return { success: false, message: `Verbindungsfehler: ${error?.message || error}` };
  }
};

export const validateToken = async (retryCount = 0): Promise<AuthResponse> => {
  const token = getToken();
  if (!token) return { success: false, message: 'Kein Token vorhanden' };

  // Local expiry is only an optimization. The backend is authoritative.
  if (jwtUtils.isExpired(token)) {
    clearAuth();
    return { success: false, message: 'Token abgelaufen' };
  }

  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ action: 'validate', token })
    });
    const data: AuthResponse = await response.json();

    if (response.ok && data.success) return data;

    if (response.ok && !data.success) {
      clearAuth();
      return data;
    }

    if (retryCount < 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return validateToken(retryCount + 1);
    }

    clearAuth();
    return { success: false, message: 'Anmeldung konnte nicht überprüft werden. Bitte erneut anmelden.' };
  } catch (error: any) {
    if (retryCount < 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return validateToken(retryCount + 1);
    }

    // Fail closed: an unverifiable session must not grant protected access.
    clearAuth();
    return { success: false, message: 'Anmeldung konnte wegen eines Verbindungsfehlers nicht überprüft werden.' };
  }
};

export const renewToken = async (): Promise<AuthResponse> => {
  const result = await authToken.renewToken();
  if (result.success && result.token) {
    return {
      success: true,
      message: result.message,
      token: result.token,
      username: jwtUtils.getUsername(result.token),
      status: jwtUtils.getStatus(result.token),
      expires_at: jwtUtils.getExpiry(result.token) || undefined
    };
  }
  return { success: false, message: result.message };
};

export const checkAuth = async (): Promise<AuthState> => {
  let token = getToken();

  if (!token || jwtUtils.isExpired(token)) {
    clearAuth();
    return { isAuthenticated: false, username: null, status: null, mustChangePassword: false, isBlocked: false };
  }

  const localUsername = jwtUtils.getUsername(token);

  if (shouldRenewToken()) {
    const renewResult = await renewToken();
    if (renewResult.success && renewResult.token) token = renewResult.token;
  }

  const validateResult = await validateToken();
  if (!validateResult.success) {
    clearAuth();
    return { isAuthenticated: false, username: null, status: null, mustChangePassword: false, isBlocked: false };
  }

  const userStatus = validateResult.status || jwtUtils.getStatus(token) || null;
  return {
    isAuthenticated: true,
    username: validateResult.username || localUsername,
    status: userStatus,
    mustChangePassword: validateResult.must_change_password === true,
    isBlocked: userStatus === 'blocked'
  };
};

export const logout = async (): Promise<AuthResponse> => {
  const token = getToken();
  if (!token) {
    clearAuth();
    return { success: true, message: 'Bereits abgemeldet' };
  }

  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ action: 'logout', token })
    });
    const data: AuthResponse = await response.json();
    clearAuth();
    return data;
  } catch (error: any) {
    clearAuth();
    return { success: true, message: 'Abgemeldet (offline)' };
  }
};

export const setPassword = async (newPassword: string): Promise<AuthResponse> => {
  const token = getToken();
  if (!token) return { success: false, message: 'Kein Token vorhanden' };

  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ action: 'set_password', token, new_password: newPassword })
    });
    const data: AuthResponse = await response.json();

    // set_password invalidates the old token; persist the replacement returned by the backend.
    if (response.ok && data.success && data.token) storeAuth(data.token);
    return data;
  } catch (error: any) {
    return { success: false, message: `Verbindungsfehler: ${error?.message || error}` };
  }
};

// DEPRECATED: Auto-renewal is handled by useAuth hook.
export const startAutoRenewal = () => {};
export const stopAutoRenewal = () => {};
