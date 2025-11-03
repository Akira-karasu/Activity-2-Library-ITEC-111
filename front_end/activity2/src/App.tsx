import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import AppRoutes from "./navigations/appRoutes";
import AuthRoutes from "./navigations/authRoutes";
import { useAuth } from "./store/auth";

function App() {
  const { token } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Keep local logged-in state in sync with the auth token from the store
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
<BrowserRouter>
    {isLoggedIn ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
    )}
  </BrowserRouter>
  )
}

export default App
