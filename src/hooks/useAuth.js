import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("app_token");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
}