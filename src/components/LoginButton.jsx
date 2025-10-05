import React from "react";

const GOOGLE_CLIENT_ID = "126714725886-vh3uh19unrn9mrj60pv9vg3fk1q669dn.apps.googleusercontent.com"; 
const REDIRECT_URI = "https://appwebfull.netlify.app/auth/google";
const SCOPE = "openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

const LoginButton = () => {
  const handleLogin = () => {
    const state = "xyz123";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPE)}&state=${state}&prompt=consent`;

    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Iniciar sesión con Google</button>;
};

export default LoginButton;