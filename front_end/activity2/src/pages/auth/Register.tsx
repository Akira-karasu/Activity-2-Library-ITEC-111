import "../../style/auth.css";
import TextInput from "../../component/input/TextInput";
import Button from "../../component/button/button";
import useRegister from "../../hooks/useRegister";

export default function Register() {
    const { 
        username, setUsername, 
        password, setPassword, 
        confirmPassword, setConfirmPassword, 
        register,
        isLoading,
        error
    } = useRegister();
    return (
        <div className="container">
            <form className="form">
                <h1 className="text-4xl font-bold">Sign up</h1>
                <p>Create your account </p>
                    <TextInput inputLabel="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextInput inputLabel="Password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextInput inputLabel="Confirm Password" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button title="SIGN UP" onPress={() => void register()} disabled={isLoading} />   
                    {error && (
                      <div style={{ 
                        color: '#dc2626', 
                        backgroundColor: '#fee2e2', 
                        padding: '0.75rem', 
                        borderRadius: '0.375rem',
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem',
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
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        Creating your account...
                      </div>
                    )}
                <hr style={{ width: "100%" }} />
                <p>Already have an account? <a href="/" style={{ color: "#FF6B3F" }}>Login</a></p>
            </form>
        </div>
    );
}
