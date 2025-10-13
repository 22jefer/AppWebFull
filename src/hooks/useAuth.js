import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = cargando

  useEffect(() => {
    const token = localStorage.getItem("app_token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const { jwtDecode } = require("jwt-decode");
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.warn("⏰ Token expirado");
        localStorage.removeItem("app_token");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("❌ Token inválido:", err);
      localStorage.removeItem("app_token");
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
}