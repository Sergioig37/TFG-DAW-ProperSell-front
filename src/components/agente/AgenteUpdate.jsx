import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container, useStepContext } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const AgenteUpdate = () => {

    const { id } = useParams();
    const [idAgente, setIdAgente] = useState(0);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9090/agente/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setNombre(data.nombre);
            setCorreo(data.correo);
            setNumeroTelefono(data.numeroTelefono);
            setIdAgente(data.id);
          });
      }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { nombre, correo, numeroTelefono });
    var data = {
        id: idAgente,
        nombre: nombre,
        correo: correo,
        numeroTelefono: numeroTelefono,
      };
    
      fetch(`http://localhost:9090/agente/edit/${data.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      window.location.replace("/admin/agentes-dashboard");
      };0





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
