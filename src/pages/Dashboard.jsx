import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("app_token");

    if (!token) {
      console.warn("🔒 No hay token, redirigiendo al login...");
      window.location.href = "/";
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("✅ Token decodificado:", decoded);

      // Verifica expiración
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        console.warn("⏰ Token expirado, redirigiendo...");
        localStorage.removeItem("app_token");
        window.location.href = "/";
        return;
      }

      setUser({
        nombre: decoded.name,
        email: decoded.email,
        foto: decoded.picture,
        rol: decoded.role
      });
    } catch (err) {
      console.error("❌ Token inválido:", err);
      localStorage.removeItem("app_token");
      window.location.href = "/";
    }
  }, []);

  if (!user) return <p>Cargando dashboard...</p>;

  return (
    <div>
      <h1>Bienvenido, {user.nombre}</h1>
      <img src={user.foto} alt="Foto de perfil" width={80} />
      <p>Email: {user.email}</p>
      <p>Rol: {user.rol}</p>
      <button onClick={() => {
        localStorage.removeItem("app_token");
        window.location.href = "/";
      }}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;