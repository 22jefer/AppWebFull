import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("app_token");

    if (!storedToken) {
      navigate("/"); // Redirige si no hay token
      return;
    }

    setToken(storedToken);

    // Opcional: decodificar el token si contiene datos del usuario
    // Aquí puedes usar jwt-decode si lo deseas
    // Ejemplo: const decoded = jwtDecode(storedToken);

    // Simulación de datos de usuario
    setUser({
      nombre: "Jefferson",
      email: "jefferson@example.com",
      foto: "https://via.placeholder.com/100"
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("app_token");
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido al Dashboard</h1>

      {user && (
        <div style={{ marginBottom: "1rem" }}>
          <img src={user.foto} alt="Foto de perfil" style={{ borderRadius: "50%" }} />
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <div>
        <p><strong>Token de sesión:</strong></p>
        <code style={{ wordBreak: "break-word" }}>{token}</code>
      </div>

      <button onClick={handleLogout} style={{ marginTop: "2rem" }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;