import { useState, useEffect, useCallback } from 'react';
import { 
  checkAuth, 
  login as authLogin, 
  logout as authLogout,
  renewToken,
  AuthState 
} from '@/utils/authService';
import { authToken } from '@/lib/auth-utils';

interface UseAuthReturn extends AuthState {
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string; must_change_password?: boolean }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  renewToken: () => Promise<{ success: boolean; message: string }>;
  isAuthChecked: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
    status: null,
    mustChangePassword: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const refreshAuth = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const state = await checkAuth();
      setAuthState(state);
    } catch (err: any) {
      setError(err?.message || 'Fehler beim Prüfen der Authentifizierung');
      setAuthState({
        isAuthenticated: false,
        username: null,
        status: null,
        mustChangePassword: false
      });
    } finally {
      setLoading(false);
      setIsAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const interval = setInterval(async () => {
      const success = await authToken.autoRenew();
      if (!success) {
        console.log('Auto-renewal failed, logging out user');
        await logout();
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authState.isAuthenticated]);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authLogin(username, password);
      
      if (result.success) {
        await refreshAuth();
      } else {
        setError(result.message);
      }
      
      return {
        success: result.success,
        message: result.message,
        must_change_password: result.must_change_password
      };
    } catch (err: any) {
      const message = err?.message || 'Fehler beim Anmelden';
      setError(message);
      return {
        success: false,
        message
      };
    } finally {
      setLoading(false);
    }
  }, [refreshAuth]);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authLogout();
      setAuthState({
        isAuthenticated: false,
        username: null,
        status: null,
        mustChangePassword: false
      });
    } catch (err: any) {
      setError(err?.message || 'Fehler beim Abmelden');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRenewToken = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    const result = await renewToken();
    if (result.success) {
      const newUsername = authToken.getUsername();
      setAuthState(prev => ({
        ...prev,
        username: newUsername
      }));
    }
    return result;
  }, []);

  return {
    ...authState,
    loading,
    error,
    login,
    logout,
    refreshAuth,
    renewToken: handleRenewToken,
    isAuthChecked
  };
};
