import React, { useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ClienteCreate = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { nombre, correo, numeroTelefono });
    var data = {
      nombre: nombre,
      correo: correo,
      numeroTelefono: numeroTelefono,
    };

    fetch("http://localhost:9090/cliente/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        navigate("/admin/clientes-dashboard");
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número de Teléfono"
              value={numeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
