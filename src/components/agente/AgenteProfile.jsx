import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Paper,
  Divider,
  Button,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const AgenteProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agente, setAgente] = useState({});
  const [clientes, setClientes] = useState({});
  const token = useAuth().getToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:9090/agente/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAgente(data);
        fetch(`http://localhost:9090/agenteCliente/clientes/${data.id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res?res.json():null)
          .then((clientesData) => setClientes(clientesData?clientesData:{}));
      });
  }, [id, token, navigate]);

  const handleEdit = () => {
    navigate(`/agente/edit/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="md" sx={{ marginTop: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src={agente.avatar}
                alt={agente.nombre}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {agente.nombre}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {agente.inmobiliaria}
              </Typography>
              <Divider sx={{ my: 2, width: "100%" }} />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{ mt: 2 }}
              >
                Editar Perfil
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Información de Contacto
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Teléfono:</strong> {agente.numeroTelefono}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {agente.correo}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Clientes del Agente
              </Typography>
              <List>
                {clientes.length > 0 ? (
                  clientes.map((cliente) => (
                    <ListItem key={cliente.id}>
                      <ListItemAvatar>
                        <Avatar>{cliente.nombre[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={cliente.nombre}
                        secondary={`Email: ${cliente.correo}, Teléfono: ${cliente.numeroTelefono}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography>No está trabajando con nadie</Typography>
                )}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
