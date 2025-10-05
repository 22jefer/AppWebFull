import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginButton from "./components/LoginButton";
import Callback from "./pages/Callback";
import Dashboard from "./pages/Dashboard";



function App() {
  const isAuthenticated = !!localStorage.getItem("app_token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/auth/google" element={<Callback />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
