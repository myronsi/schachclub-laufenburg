import { authToken, jwtUtils } from '@/lib/auth-utils';

const AUTH_API_URL = 'https://sc-laufenburg.de/api/auth.php';

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

export const storeAuth = (token: string) => {
  authToken.set(token);
};

export const clearAuth = () => {
  authToken.remove();
};

export const getToken = (): string | null => {
  return authToken.get();
};

export const getUsername = (): string | null => {
  return authToken.getUsername();
};

const getTokenExpiry = (): number | null => {
  return authToken.getExpiry();
};

const shouldRenewToken = (): boolean => {
  return authToken.needsRenewal();
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        password, 
        action: 'login' 
      })
    });

    const data: AuthResponse = await response.json();
    
    if (response.ok && data.success && data.token) {
      storeAuth(data.token);
    }
    
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: `Verbindungsfehler: ${error?.message || error}`
    };
  }
};

export const validateToken = async (): Promise<AuthResponse> => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      message: 'Kein Token vorhanden'
    };
  }

  if (jwtUtils.isExpired(token)) {
    clearAuth();
    return {
      success: false,
      message: 'Token abgelaufen'
    };
  }

  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        action: 'validate',
        token 
      })
    });

    const data: AuthResponse = await response.json();
    
    if (!response.ok || !data.success) {
      clearAuth();
    }
    
    return data;
  } catch (error: any) {
    clearAuth();
    return {
      success: false,
      message: `Verbindungsfehler: ${error?.message || error}`
    };
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
  
  return {
    success: false,
    message: result.message
  };
};

export const checkAuth = async (): Promise<AuthState> => {
  let token = getToken();
  
  if (!token) {
    return {
      isAuthenticated: false,
      username: null,
      status: null,
      mustChangePassword: false,
      isBlocked: false
    };
  }

  if (jwtUtils.isExpired(token)) {
    clearAuth();
    return {
      isAuthenticated: false,
      username: null,
      status: null,
      mustChangePassword: false,
      isBlocked: false
    };
  }

  const username = jwtUtils.getUsername(token);

  // Try to renew token if needed, but don't fail auth if renewal fails
  if (shouldRenewToken()) {
    console.log('Token within 24h of expiry, attempting renewal...');
    const renewResult = await renewToken();
    if (renewResult.success && renewResult.token) {
      token = renewResult.token;
      console.log('Token renewal successful in checkAuth');
    } else {
      console.log('Token renewal failed in checkAuth:', renewResult.message);
      // Don't clear auth here - the token might still be valid
    }
  }

  // Validate the token (either original or renewed)
  const validateResult = await validateToken();
  
  // If validation fails, clear auth
  if (!validateResult.success) {
    clearAuth();
  }
  
  const userStatus = validateResult.status || null;
  const isBlocked = userStatus === 'blocked';
  
  return {
    isAuthenticated: validateResult.success,
    username: validateResult.username || username,
    status: userStatus,
    mustChangePassword: false,
    isBlocked: isBlocked
  };
};

export const logout = async (): Promise<AuthResponse> => {
  const token = getToken();
  
  if (!token) {
    clearAuth();
    return {
      success: true,
      message: 'Bereits abgemeldet'
    };
  }

  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        action: 'logout',
        token 
      })
    });

    const data: AuthResponse = await response.json();
    clearAuth();
    
    return data;
  } catch (error: any) {
    clearAuth();
    return {
      success: true,
      message: 'Abgemeldet (offline)'
    };
  }
};

export const setPassword = async (newPassword: string): Promise<AuthResponse> => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      message: 'Kein Token vorhanden'
    };
  }

  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        action: 'set_password',
        token,
        new_password: newPassword
      })
    });

    const data: AuthResponse = await response.json();
    
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: `Verbindungsfehler: ${error?.message || error}`
    };
  }
};

// DEPRECATED: Auto-renewal is now handled by useAuth hook
// These functions are kept for backward compatibility but do nothing
export const startAutoRenewal = () => {
  // No-op: Auto-renewal is now handled by useAuth hook
  console.log('startAutoRenewal is deprecated - auto-renewal is handled by useAuth hook');
};

export const stopAutoRenewal = () => {
  // No-op: Auto-renewal is now handled by useAuth hook
  console.log('stopAutoRenewal is deprecated - auto-renewal is handled by useAuth hook');
};
