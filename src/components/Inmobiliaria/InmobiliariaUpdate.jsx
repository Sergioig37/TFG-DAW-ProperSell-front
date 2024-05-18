import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const InmobiliariaUpdate = () => {
  const { id } = useParams();
  const [idInmobiliaria, setIdInmobiliaria] = useState(0);
  const [nombre, setNombre] = useState("");
  const [numeroEmpleados, setNumeroEmpleados] = useState("");
  const [direccion, setDireccion] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9090/inmobiliaria/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre);
        setNumeroEmpleados(data.numeroEmpleados);
        setDireccion(data.direccion);
        setIdInmobiliaria(data.id);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { nombre, numeroEmpleados, direccion });
    var data = {
      id: idInmobiliaria,
      nombre: nombre,
      numeroEmpleados: numeroEmpleados,
      direccion: direccion,
    };

    fetch(`http://localhost:9090/inmobiliaria/edit/${data.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        navigate("/admin/inmobiliarias-dashboard");
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
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
  );
};
