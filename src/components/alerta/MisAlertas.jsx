import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { NavbarGeneral } from "../NavbarGeneral";
import { Delete, Edit } from "@mui/icons-material";

export const MisAlertas = () => {
  const [alertas, setAlertas] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const user = useAuth().getUser();
  const rol = useAuth().getRol();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/alertas/${user}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAlertas(data);
        });
    }
  }, [token, user, navigate]);

  const handleEdit = (id) => {
    // Navega a la ruta de edición
    navigate(`/alerta/edit/${id}`);
  };

  const handleDelete = (idAlerta) => {
    // Implementa la lógica de eliminación aquí
    console.log("Eliminar alerta", idAlerta);
    fetch(`http://localhost:9090/alerta/del/${idAlerta}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setAlertas(alertas.filter(alerta => alerta.id !== idAlerta));
    });
    console.log("Eliminado alerta", idAlerta);
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Alertas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/alerta/create")}
          sx={{ mt: 2, textTransform: "none" }}
        >
          Añadir alerta
        </Button>

        {alertas.length > 0 ? (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {alertas.map((alerta) => (
              <Grid item key={alerta.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      {alerta.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {alerta.descripcion}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <IconButton onClick={() => handleEdit(alerta.id)}>
                      <Edit />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(alerta.id)}>
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
              mt: 2,
            }}
          >
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              No tienes alertas
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Intenta añadir algunas alertas.
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/alerta/create")}
              sx={{ mt: 2, textTransform: "none" }}
            >
              Buscar Alertas
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};
