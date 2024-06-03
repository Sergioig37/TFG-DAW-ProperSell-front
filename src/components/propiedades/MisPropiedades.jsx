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
import { Delete, Edit } from "@mui/icons-material";

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
        {propiedades.length > 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/propiedad/create")}
            sx={{ mt: 2, textTransform: "none" }}
          >
            Añadir propiedad
          </Button>
        ) : (
          <></>
        )}

        {propiedades.length > 0  ? (
          <Grid container spacing={4}>
            {propiedades.map((propiedad) => (
              <Grid item key={propiedad.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Imagen de la propiedad"
                    height="200"
                    image="/path/to/default/image.jpg" // Aquí puedes poner una imagen por defecto o el atributo propiedad.imagen si tienes la URL de la imagen
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{propiedad.tipo}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {propiedad.localizacion}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      ${propiedad.precio}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <IconButton onClick={() => handleEdit(propiedad.id)}>
                      <Edit />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(propiedad.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
            flexDirection="column"
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
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
              sx={{ mt: 2, textTransform: "none" }}
            >
              Añadir propiedad
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};
