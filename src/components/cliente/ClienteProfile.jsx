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
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { Edit, Delete } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const ClienteProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/cliente/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCliente(data);
        });
    }
  }, [id, token, navigate]);

  const handleEdit = () => {
    navigate(`/cliente/edit/${id}`);
  };

  const handleDelete = (idPropiedad) => {
    // Implementa la lógica de eliminación aquí
    console.log("Eliminar propiedad", idPropiedad);
    var data = {
      id: idPropiedad,
    };

    fetch(`http://localhost:9090/propiedad/del/${data.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    window.location.reload();
    console.log("Eliminado propiedad", data.id);
  };

  const handleCrearPropiedad = (id) => {
    navigate(`/cliente/${id}/propiedad/create`);
  };

  const handleVer = (id) => {
    // Navega a la ruta de edición
    navigate(`/propiedad/${id}`);
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
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                alt={cliente.nombre}
              >
                {cliente.nombre ? cliente.nombre[0] : "C"}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {cliente.nombre}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Editar Perfil
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCrearPropiedad(cliente.id)}
                sx={{ mt: 2 }}
              >
                Añadir Propiedad
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Información de Contacto
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Correo:</strong> {cliente.correo}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Teléfono:</strong> {cliente.numeroTelefono}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Propiedades del Cliente
              </Typography>
              <List sx={{ width: "100%" }}>
                {cliente.propiedades &&
                  cliente.propiedades.map((propiedad) => (
                    <ListItem key={propiedad.id}>
                      <ListItemAvatar>
                        <Avatar src={propiedad.image} alt={propiedad.tipo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={propiedad.tipo}
                        secondary={`Localización: ${propiedad.localizacion}, Precio: ${propiedad.precio} $`}
                      />
                      <IconButton onClick={() => handleVer(propiedad.id)}>
                        <VisibilityIcon></VisibilityIcon>
                      </IconButton>
                      <IconButton onClick={() => handleDelete(propiedad.id)}>
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
