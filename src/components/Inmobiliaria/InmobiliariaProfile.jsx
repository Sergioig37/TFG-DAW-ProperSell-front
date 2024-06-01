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
  IconButton
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { Delete } from "@mui/icons-material";

export const InmobiliariaProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [inmobiliaria, setInmobiliaria] = useState({});

  const handleDelete = (idAgente) => {
    // Implementa la lógica de eliminación aquí

    var data = {
      id: idAgente,
    };

    fetch(`http://localhost:9090/agente/del/${data.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    window.location.reload();
    console.log("Eliminado Agente", data.id);
  };

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

  const handleCrearAgente = (id) => {
    navigate(`/inmobiliaria/${id}/agente/create`);
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCrearAgente(inmobiliaria.id)}
                sx={{ mt: 2 }}
              >
                Crear Agente
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
              {inmobiliaria.agentes ? (
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
                        <IconButton onClick={() => handleDelete(agente.id)}>
                          <Delete />
                        </IconButton>
                      </ListItem>
                    ))}
                </List>
              ) : (
                <Typography variant="body1" gutterBottom>
                  No hay agentes
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
