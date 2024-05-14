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

export const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    correo: "",
    rol: "Cliente",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);

    fetch("", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    navigate("/");
    // Aquí puedes agregar la lógica para manejar los datos del formulario
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
          <FormControl component="fieldset" style={{ marginTop: "16px" }}>
            <FormLabel component="legend">Rol</FormLabel>
            <RadioGroup name="rol" value={values.rol} onChange={handleChange}>
              <FormControlLabel
                value="Cliente"
                control={<Radio />}
                label="Cliente"
              />
              <FormControlLabel
                value="Inmobiliaria"
                control={<Radio />}
                label="Inmobiliaria"
              />
            </RadioGroup>
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
    </Container>
  );
};
