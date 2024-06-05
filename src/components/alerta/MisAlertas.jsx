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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const MisAlertas = () => {
  const [alertasUsuario, setAlertasUsuario] = useState([]);
  const [alertasDisponibles, setAlertasDisponibles] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const user = useAuth().getUser();
  const rol = useAuth().getRol();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/${user}/alertas`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => (res ? res.json() : {}))
        .then((data) => {
          setAlertasUsuario(data ? data : []);
        });

      fetch(`http://localhost:9090/usuario/${user}/alertasDisponibles`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => (res ? res.json() : {}))
        .then((data) => {
          setAlertasDisponibles(data ? data : []);
        });
    }
  }, [token, user, navigate]);

  const handleAddAlertas = (id) => {
    const add = true;

    fetch(`http://localhost:9090/usuario/${user}/${id}/${add}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const alertaAñadida = alertasDisponibles.find((alerta) => alerta.id === id);

    setAlertasUsuario([...alertasUsuario, alertaAñadida]);

    setAlertasDisponibles(
      alertasDisponibles.filter((alerta) => alerta.id !== id)
    );
  };

  const handleRemoveAlerta = (id) => {
    const add = false;


    fetch(`http://localhost:9090/usuario/${user}/${id}/${add}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const alertaQuitada = alertasUsuario.find((alerta) => alerta.id === id);

    setAlertasUsuario(alertasUsuario.filter((alerta) => alerta.id !== id));

    setAlertasDisponibles([...alertasDisponibles, alertaQuitada]);
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mis Alertas
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Tus Alertas
            </Typography>
            {alertasUsuario.length > 0 ? (
              <Grid container spacing={2}>
                {alertasUsuario.map((alerta) => (
                  <Grid item key={alerta.id} xs={12}>
                    <Card sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>
                          {alerta.nombre}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          {alerta.descripcion}
                        </Typography>
                      </CardContent>
                      <Button onClick={() => handleRemoveAlerta(alerta.id)}>
                        <RemoveIcon />
                      </Button>
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
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  Intenta añadir algunas alertas.
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Alertas Disponibles
            </Typography>
            {alertasDisponibles.length > 0 ? (
              <Grid container spacing={2}>
                {alertasDisponibles.map((alerta) => (
                  <Grid item key={alerta.id} xs={12}>
                    <Card sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>
                          {alerta.nombre}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          {alerta.descripcion}
                        </Typography>
                        <Button onClick={() => handleAddAlertas(alerta.id)}>
                          <AddIcon />
                        </Button>
                      </CardContent>
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
                  No hay alertas disponibles
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  Intenta más tarde.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
