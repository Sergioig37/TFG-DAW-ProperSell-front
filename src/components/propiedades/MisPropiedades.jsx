import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { NavbarGeneral } from "../NavbarGeneral";
import { Delete, Edit, Add } from "@mui/icons-material";
import '../styles/mispropiedades.css';

export const MisPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const user = useAuth().getUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/propiedades/${user}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data?data:{});
        });
    }
  }, [token, user, navigate]);


  const handleEdit = (id) => {
    // Navega a la ruta de edición
    navigate(`/propiedad/edit/${id}`);
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

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="lg" className="container">
        <Typography variant="h4" gutterBottom className="heading">
          Mis Propiedades
        </Typography>

        {propiedades.length > 0 && (
          <Box className="add-property-box">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/propiedad/create")}
              startIcon={<Add />}
              className="add-property-button"
            >
              Añadir propiedad
            </Button>
          </Box>
        )}

        {propiedades.length > 0 ? (
          <Grid container spacing={4}>
            {propiedades.map((propiedad) => (
              <Grid item key={propiedad.id} xs={12} sm={6} md={4}>
                <Card className="card">
                  <CardMedia
                    component="img"
                    alt="Imagen de la propiedad"
                    height="200"
                    image="/path/to/default/image.jpg"
                    className="card-media"
                  />
                  <CardContent className="card-content">
                    <Typography variant="h6" gutterBottom>
                      {propiedad.tipo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {propiedad.localizacion}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      ${propiedad.precio}
                    </Typography>
                  </CardContent>
                  <Box className="card-actions">
                    <IconButton onClick={() => handleEdit(propiedad.id)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(propiedad.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={3} className="no-properties-paper">
            <Typography variant="h6" className="no-properties-title">
              No tienes propiedades
            </Typography>
            <Typography variant="body1" className="no-properties-text">
              Intenta añadir algunas propiedades.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/propiedad/create")}
              startIcon={<Add />}
              className="no-properties-button"
            >
              Añadir propiedad
            </Button>
          </Paper>
        )}
      </Container>
    </>
  );
};
