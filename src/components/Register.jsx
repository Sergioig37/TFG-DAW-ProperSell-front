import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    correo: "",
    rol: "",
    nombreReal: "",
  });
  const token = useAuth().getToken();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);

    fetch("http://localhost:9090/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    }).then((response) => {
      if (response.ok && !token) {
        navigate("/login");
      }
      else{
        navigate("/admin/usuarios-dashboard")
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ marginTop: "16px", padding: "32px" }}>
        <Typography component="h1" variant="h5">
          Registro de Usuario
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="nombreReal"
            label="Nombre real"
            value={values.nombreReal}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="username"
            label="Nombre de usuario"
            value={values.username}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="correo"
            label="Correo Electrónico"
            type="email"
            value={values.correo}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "24px" }}
          >
            Registrarse
          </Button>
        </form>
      </Paper>
      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </Typography>
    </Container>
  );
};
