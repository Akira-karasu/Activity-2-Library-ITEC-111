import { useState } from "react";
import { register as authRegister } from '../service/authService';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    // Client-side validation
    if (!username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await authRegister({ username, password, confirmPassword });
      // Registration successful - navigate to login
      navigate('/');
    } catch (err: any) {
      // Get the detailed error message from the NestJS response
      const errorResponse = err?.response?.data;
      if (errorResponse) {
        // Handle specific validation messages
        const message = errorResponse.message;
        if (typeof message === 'string') {
          if (message.includes('password must be longer than or equal to 6 characters')) {
            setError('Password must be at least 6 characters long');
          } else if (message.includes('passwords do not match')) {
            setError('Passwords do not match');
          } else if (message.includes('username already exists')) {
            setError('Username is already taken');
          } else {
            // Other NestJS errors
            setError(message || errorResponse.error || 'Registration failed');
          }
        } else if (Array.isArray(message)) {
          // Handle multiple validation errors by showing the first one
          setError(message[0] || 'Registration failed');
        } else {
          setError(errorResponse.error || 'Registration failed');
        }
      } else if (err?.message) {
        // Network or other client-side errors
        setError(err.message);
      } else {
        setError('An unexpected error occurred during registration');
      }
      console.error('Registration error:', errorResponse || err);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    username, 
    setUsername, 
    password, 
    setPassword, 
    confirmPassword, 
    setConfirmPassword,
    register,
    isLoading,
    error
  };
}
