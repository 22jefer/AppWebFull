import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; // ✅ Import directo, más claro que require()

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = cargando

  useEffect(() => {
    const token = localStorage.getItem("app_token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp > now) {
        setIsAuthenticated(true);
      } else {
        console.warn("⏰ Token expirado");
        localStorage.removeItem("app_token");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("❌ Token inválido:", err);
      localStorage.removeItem("app_token");
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
}