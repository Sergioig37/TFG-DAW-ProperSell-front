import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
 
    navigate("/home");
  };

  const handleLogin = () => {
    const credentials = btoa(`${username}:${password}`); 
    fetch('http://localhost:9090/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': `Basic ${credentials}`
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
      credentials: 'include', // Incluir credenciales (cookies, encabezados de autorización, etc.)
    })
      .then(response => {
        if (response.ok) {
          handleSuccessfulLogin();
        } else {
          // Manejar error de autenticación
          console.error("Error de autenticación");
        }
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Nombre de usuario"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Iniciar Sesión
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿No tienes cuenta? <a href="/register">Regístrate ahora</a>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        ¿Olvidaste tu contraseña?{" "}
        <a href="/">Recupérala aquí</a>
      </Typography>
    </Container>
  );
};
