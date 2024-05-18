import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Avatar, IconButton, Box, Paper, Divider, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { NavbarGeneral } from "../NavbarGeneral";

export const AgenteProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agente, setAgente] = useState({
    nombre: "",
    numeroTelefono: "",
    inmobiliaria: "",
    email: "",
    descripcion: "",
    experiencia: "",
    avatar: "",
  });

  useEffect(() => {
    fetch(`http://localhost:9090/agente/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAgente(data);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/agente/edit/${id}`);
  };

  return (
    <>
    <NavbarGeneral/>
    <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar src={agente.avatar} sx={{ width: 120, height: 120, mb: 2 }}></Avatar>
            <Typography variant="h5" gutterBottom>
              {agente.nombre}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {agente.inmobiliaria}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Editar Perfil
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Información de Contacto
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Teléfono:</strong> {agente.numeroTelefono}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {agente.email}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Acerca de Mí
            </Typography>
            <Typography variant="body1" gutterBottom>
              {agente.descripcion}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Experiencia
            </Typography>
            <Typography variant="body1" gutterBottom>
              {agente.experiencia}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Habilidades
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
};
