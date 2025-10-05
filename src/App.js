import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import Callback from "./pages/Callback";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";



function App() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <p>Cargando sesión...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/auth/google" element={<Callback />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
