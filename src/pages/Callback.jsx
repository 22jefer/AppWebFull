import { useEffect, useState } from "react";

const Callback = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("📦 Código recibido:", code);

    if (!code) {
      setError("No se recibió el código de Google.");
      return;
    }

    const endpoint = `https://8okanrhrtf.execute-api.us-east-2.amazonaws.com/Etapa_v1/auth/google?code=${encodeURIComponent(code)}`;
    console.log("🚀 Ejecutando fetch a:", endpoint);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Respuesta del backend:", data);
        if (data.tokens?.app_token) {
          localStorage.setItem("app_token", data.tokens.app_token);
          window.location.href = "/dashboard";
        } else {
          setError("No se recibió el token de la aplicación.");
        }
      })
      .catch((err) => {
        console.error("🔥 Error en el login:", err);
        setError("Error al procesar el login.");
      });
  }, []);

  if (error) return <p>{error}</p>;
  return <p>Procesando login...</p>;
};

export default Callback;