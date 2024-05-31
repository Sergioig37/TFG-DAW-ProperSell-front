import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const InmobiliariaProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [inmobiliaria, setInmobiliaria] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/inmobiliaria/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setInmobiliaria(data);
        });
    }
  }, [id, token, navigate]);

  const handleEdit = () => {
    navigate(`/inmobiliaria/edit/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="md" sx={{ marginTop: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 120, height: 120, mb: 2 }}>
                {inmobiliaria.nombre ? inmobiliaria.nombre[0] : "I"}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {inmobiliaria.nombre}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Editar Perfil
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Información de la Inmobiliaria
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Número de Empleados:</strong>{" "}
                {inmobiliaria.numeroEmpleados}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Dirección:</strong> {inmobiliaria.direccion}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Agentes de la Inmobiliaria
              </Typography>
              {
                !inmobiliaria.agentes?(
                  <List sx={{ width: "100%" }}>
                {inmobiliaria.agentes &&
                  inmobiliaria.agentes.map((agente) => (
                    <ListItem key={agente.id}>
                      <ListItemAvatar>
                        <Avatar src={agente.avatar} alt={agente.nombre} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={agente.nombre}
                        secondary={agente.numeroTelefono}
                      />
                    </ListItem>
                  ))}
              </List>
                ):
                <Typography variant="body1" gutterBottom>No hay agentes</Typography>
              }
              
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
