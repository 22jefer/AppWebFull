import { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("🔍 URL actual:", window.location.href);
    console.log("📦 Código recibido:", code);

    if (!code) {
      console.error("❌ No se encontró el parámetro 'code' en la URL");
      return;
    }

    const endpoint = `https://8okanrhrtf.execute-api.us-east-2.amazonaws.com/Etapa_v1/auth/google?code=${encodeURIComponent(code)}`;
    console.log("🚀 Ejecutando fetch a:", endpoint);

    fetch(endpoint)
      .then((res) => {
        console.log("📡 Estado de respuesta HTTP:", res.status);
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Respuesta del backend:", data);

        if (data.tokens?.app_token) {
          localStorage.setItem("app_token", data.tokens.app_token);
          console.log("🔐 Token guardado en localStorage:", data.tokens.app_token);
          console.log("➡️ Redirigiendo al dashboard...");
          window.location.href = "/dashboard";
        } else {
          console.error("⚠️ No se recibió app_token en la respuesta:", data);
        }
      })
      .catch((err) => {
        console.error("🔥 Error en el login:", err);
      });
  }, []);

  return <p>Procesando login...</p>;
};

export default Callback;