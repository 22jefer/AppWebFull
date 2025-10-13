import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('app_token');
    if (!token) return redirect();

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) return redirect();

      setUser({
        nombre: decoded.name,
        email: decoded.email,
        foto: decoded.picture,
        rol: decoded.role
      });
    } catch {
      redirect();
    }
  }, []);

  const redirect = () => {
    localStorage.removeItem('app_token');
    window.location.href = '/';
  };

  if (!user) return <p>Cargando dashboard...</p>;

  return (
    <div>
      <h1>Bienvenido, {user.nombre}</h1>
      <img src={user.foto} alt="Foto de perfil" width={80} />
      <p>Email: {user.email}</p>
      <p>Rol: {user.rol}</p>
      <button onClick={redirect}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;