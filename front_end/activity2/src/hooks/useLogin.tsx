import { useState } from 'react';
import { login as authLogin, logout as authLogout } from '../service/authService';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const setAuthLogin = useAuth((s) => s.login);
  const setAuthLogout = useAuth((s) => s.logout);
  const token = useAuth((s) => s.token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {

    setIsLoading(true);
    setError(null);
    try {
      const data = await authLogin({ username, password });
      // backend returns { access_token: string }
      const accessToken = (data && (data.access_token ?? data.token)) || null;
      setAuthLogin(accessToken);
      // Navigate to home page after successful login
      navigate('/home');
    } catch (err: any) {
      // Get the detailed error message from the NestJS response
      const errorResponse = err?.response?.data;
      if (errorResponse) {
        // Handle specific validation messages
        if (errorResponse.message?.includes('password must be longer than or equal to 6 characters')) {
          setError('Password must be at least 6 characters long');
        } else if (errorResponse.message === 'Invalid credentials') {
          setError('Invalid username or password');
        } else {
          // Other NestJS errors
          setError(errorResponse.message || errorResponse.error || 'Login failed');
        }
      } else if (err?.message) {
        // Network or other client-side errors
        setError(err.message);
      } else {
        setError('An unexpected error occurred during login');
      }
      console.error('Login error:', errorResponse || err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authLogout();
    } catch (e) {
      console.error('Logout failed', e);
    }
    setAuthLogout();
  };

  return {
    token,
    isLoading,
    error,
    login,
    logout,
    username,
    setUsername,
    password,
    setPassword,
  };
}
