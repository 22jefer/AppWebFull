import { useEffect, useState } from "react";

const Callback = () => {
  const [estado, setEstado] = useState("Procesando login...");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      setEstado("No se recibió el código de Google.");
      return;
    }

    const endpoint = `https://8okanrhrtf.execute-api.us-east-2.amazonaws.com/Etapa_v1/auth/google?code=${encodeURIComponent(code)}`;
    console.log("🔗 Enviando código a Lambda:", endpoint);

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Respuesta recibida:", data);

        const token = data.tokens?.app_token;
        if (!token) {
          setEstado("No se recibió el token de la aplicación.");
          return;
        }

        localStorage.setItem("app_token", token);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.error("❌ Error en el login:", err);
        setEstado("Error al procesar el login.");
      });
  }, []);

  return <p>{estado}</p>;
};

export default Callback;