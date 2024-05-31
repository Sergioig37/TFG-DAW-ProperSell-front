import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from './auth/AuthContext';


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setToken} = useAuth();
  const {setAuthPassword} = useAuth();
  
  const navigate = useNavigate();

  

  const handleSuccessfulLogin = () => {
    navigate("/explore");
  };

  const handleLogin = () => {
    fetch('http://localhost:9090/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: 'include', // Incluir credenciales (cookies, encabezados de autorización, etc.)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Llamar a la función json() correctamente
      })
      .then(data => {
        setAuthPassword(password);
        setToken(data.token);
        handleSuccessfulLogin(); // Manejar la respuesta de manera adecuada
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
      handleSuccessfulLogin();
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
    </Container>
  );
};
