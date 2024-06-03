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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Propiedades
        </Typography>

        {propiedades.length > 0 && (
          <Box sx={{ textAlign: "right", mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/propiedad/create")}
              startIcon={<Add />}
              sx={{ textTransform: "none" }}
            >
              Añadir propiedad
            </Button>
          </Box>
        )}

        {propiedades.length > 0 ? (
          <Grid container spacing={4}>
            {propiedades.map((propiedad) => (
              <Grid item key={propiedad.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Imagen de la propiedad"
                    height="200"
                    image="/path/to/default/image.jpg"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
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
                  <Box sx={{ p: 2, textAlign: "center" }}>
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
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              No tienes propiedades
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Intenta añadir algunas propiedades.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/propiedad/create")}
              startIcon={<Add />}
              sx={{ mt: 2, textTransform: "none" }}
            >
              Añadir propiedad
            </Button>
          </Paper>
        )}
      </Container>
    </>
  );
};
