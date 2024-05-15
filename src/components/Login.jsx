import React from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {

  const [logged, setLogged] = useState(false);  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí manejarías la lógica de login
    console.log("Intento de login");
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSuccesfullLogine = () => {
    navigate("/home");
  }

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
          id="email"
          label="Correo Electrónico/Nombre de usuario"
          name="email"
          autoComplete="email"
          autoFocus
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
