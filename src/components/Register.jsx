import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  FormControl,
  FormHelperText,
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
    numeroTelefono: "",
  });
  const [errors, setErrors] = useState({});
  const token = useAuth().getToken();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
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
        } else {
          navigate("/admin/usuarios-dashboard");
        }
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!values.nombreReal.trim()) {
      formIsValid = false;
      errors["nombreReal"] = "Ingrese su nombre real";
    }

    if (!values.username.trim()) {
      formIsValid = false;
      errors["username"] = "Ingrese un nombre de usuario";
    }

    if (!values.password.trim()) {
      formIsValid = false;
      errors["password"] = "Ingrese una contraseña";
    }

    if (!values.correo.trim()) {
      formIsValid = false;
      errors["correo"] = "Ingrese su correo electrónico";
    } else if (!/\S+@\S+\.\S+/.test(values.correo)) {
      formIsValid = false;
      errors["correo"] = "Ingrese un correo electrónico válido";
    }

    if (!values.numeroTelefono.trim()) {
      formIsValid = false;
      errors["numeroTelefono"] = "Ingrese su número de teléfono";
    } else if (!/^\d+$/.test(values.numeroTelefono)) {
      formIsValid = false;
      errors["numeroTelefono"] =
        "El número de teléfono debe contener solo números";
    } else if (values.numeroTelefono.trim().length !== 9) {
      formIsValid = false;
      errors["numeroTelefono"] = "El número de teléfono debe tener 10 dígitos";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ marginTop: "16px", padding: "32px" }}>
        <Typography component="h1" variant="h5">
          Registro de Usuario
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
          <FormControl fullWidth error={errors["nombreReal"]}>
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
            <FormHelperText>{errors["nombreReal"]}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={errors["username"]}>
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
            <FormHelperText>{errors["username"]}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={errors["password"]}>
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
            <FormHelperText>{errors["password"]}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={errors["correo"]}>
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
            <FormHelperText>{errors["correo"]}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={errors["numeroTelefono"]}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="numeroTelefono"
              label="Número de teléfono"
              value={values.numeroTelefono}
              onChange={handleChange}
              required
            />
            <FormHelperText>{errors["numeroTelefono"]}</FormHelperText>
          </FormControl>
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
