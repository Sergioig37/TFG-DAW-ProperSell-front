import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const InmobiliariaCreate = () => {
  const [nombre, setNombre] = useState("");
  const [numeroEmpleados, setNumeroEmpleados] = useState("");
  const [direccion, setDireccion] = useState("");
  const token = useAuth().getToken();
  const navigate = useNavigate();
 useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { nombre, numeroEmpleados, direccion });
    var data = {
      nombre: nombre,
      numeroEmpleados: numeroEmpleados,
      direccion: direccion,
    };

   

    fetch('http://localhost:9090/inmobiliaria/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        navigate(-1)
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  return (
    <>
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
                label="Número de Empleados"
                value={numeroEmpleados}
                onChange={(e) => setNumeroEmpleados(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
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
    </>
  );
};
