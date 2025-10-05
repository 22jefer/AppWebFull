import { useEffect, useState } from "react";

const Callback = () => {
  const [estado, setEstado] = useState("Procesando login...");

  useEffect(() => {
    console.log("🔄 Callback.jsx montado");

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("📥 Código recibido:", code);

    if (!code) {
      console.error("❌ No se encontró el parámetro 'code' en la URL");
      setEstado("Error: No se recibió el código de autenticación.");
      return;
    }

    const endpoint = `https://8okanrhrtf.execute-api.us-east-2.amazonaws.com/Etapa_v1/auth/google/callback?code=${encodeURIComponent(code)}`;

    console.log("📡 Enviando solicitud a Lambda:", endpoint);

    fetch(endpoint)
      .then((res) => {
        console.log("📶 Status HTTP:", res.status);
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Respuesta del backend:", data);

        const token = data.tokens?.app_token;

        if (token) {
          localStorage.setItem("app_token", token);
          console.log("🔐 Token guardado en localStorage");
          setEstado("Redirigiendo al dashboard...");
          window.location.href = "/dashboard";
        } else {
          console.error("❌ No se recibió app_token:", data);
          setEstado("Error: No se recibió el token de sesión.");
        }
      })
      .catch((err) => {
        console.error("🚨 Error en el login:", err);
        setEstado("Error al procesar el login. Intenta nuevamente.");
      });
  }, []);

  return <p>{estado}</p>;
};

export default Callback;