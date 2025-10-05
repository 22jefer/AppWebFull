import React from "react";

const LoginButton = () => {
  const clientId = "126714725886-vh3uh19unrn9mrj60pv9vg3fk1q669dn.apps.googleusercontent.com";
  const redirectUri = "https://appwebfull.netlify.app/auth/google";
  const scope = "openid email profile";

  const handleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&prompt=consent`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Inicia sesión con Google</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginButton;