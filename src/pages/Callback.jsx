import { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.error("No se encontró el parámetro 'code' en la URL");
      return;
    }

    // 🔐 Llamada a tu Lambda publicada en API Gateway
    fetch(`https://8okanrhrtf.execute-api.us-east-2.amazonaws.com/Etapa_v1/auth/google/callback?code=${encodeURIComponent(code)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Respuesta del backend:", data);

        if (data.tokens?.app_token) {
          localStorage.setItem("app_token", data.tokens.app_token);
          window.location.href = "/dashboard";
        } else {
          console.error("No se recibió app_token:", data);
        }
      })
      .catch((err) => {
        console.error("Error en el login:", err);
      });
  }, []);

  return <p>Procesando login...</p>;
};

export default Callback;