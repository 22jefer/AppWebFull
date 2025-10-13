import { useEffect, useState } from 'react';

const Callback = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return setError('No se recibió el código de Google.');

    const endpoint = `https://8okanrhrtf.execute-api.us-east-2.amazonaws.com/Etapa_v1/auth/google?code=${encodeURIComponent(code)}`;

    fetch(endpoint)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
        const token = data.tokens?.app_token;
        if (!token) return setError('No se recibió el token de la aplicación.');
        localStorage.setItem('app_token', token);
        window.location.href = '/dashboard';
      })
      .catch(err => {
        console.error('Error en el login:', err);
        setError('Error al procesar el login.');
      });
  }, []);

  return <p>{error || 'Procesando login...'}</p>;
};

export default Callback;