import "../../style/auth.css";
import TextInput from "../../component/input/TextInput";
import Button from "../../component/button/button";
import useLogin from "../../hooks/useLogin";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();
  const { username, setUsername, password, setPassword, login, isLoading, error, token } = useLogin();

  // When token becomes available, navigate to home
  useEffect(() => {
    if (token) navigate('/home');
  }, [token, navigate]);

  return (
    <div className="container">
        <form className="form" onSubmit={(e) => { e.preventDefault(); void login(); }}>
          <h1 className="text-4xl font-bold">Sign In</h1>
          <p>Welcome Back!  Please Sign in to your account </p>
            <TextInput value={username} onChange={(e) => setUsername(e.target.value)} inputLabel="Username" placeholder="Username"/>
            <TextInput value={password} onChange={(e) => setPassword(e.target.value)} inputLabel="Password" placeholder="Password" type="password" />
            <Button type="submit" title="SIGN IN" disabled={isLoading} />
            {error && (
              <div style={{ 
                color: '#dc2626', 
                backgroundColor: '#fee2e2', 
                padding: '0.75rem', 
                borderRadius: '0.375rem',
                marginTop: '0.5rem',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}
            {isLoading && (
              <div style={{ 
                color: '#1d4ed8', 
                backgroundColor: '#dbeafe', 
                padding: '0.75rem', 
                borderRadius: '0.375rem',
                marginTop: '0.5rem',
                fontSize: '0.875rem'
              }}>
                Signing in...
              </div>
            )}
          <hr style={{width: "100%"}}></hr>
          <p>Don't have an account? <a href="/register" style={{color: "#FF6B3F"}}>Register</a></p>
        </form>
    </div>
  );
}
