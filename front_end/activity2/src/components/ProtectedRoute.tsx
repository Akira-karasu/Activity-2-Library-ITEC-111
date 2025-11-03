import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}