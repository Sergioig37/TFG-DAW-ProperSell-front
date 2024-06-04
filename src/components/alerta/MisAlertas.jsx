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
  const [alertasUsuario, setAlertasUsuario] = useState([]);
  const [alertasDisponibles, setAlertasDisponibles] = useState([]);
  const [alertasAdd, setAlertasAdd] = useState([]);
  const [alertasQuitadas, setAlertasQuitadas] = useState([]);
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
        .then((res) => res?res.json():{})
        .then((data) => {
          setAlertasUsuario(data?data:[]);
        });
    }
  }, [token, user, navigate]);

  const handleAddAlertas = (id) => {
    // Si la alerta ya estaba quitada, la eliminamos de la lista de quitadas
    if (alertasQuitadas.includes(id)) {
      setAlertasQuitadas(alertasQuitadas.filter(alertaId => alertaId !== id));
    } else {
      // Encuentra la alerta con el ID correspondiente en alertasDisponibles
      const alertaAñadida = alertasDisponibles.find((alerta) => alerta.id === id);
  
      // Actualiza alertasUsuario añadiendo la alerta
      setAlertasUsuario([...alertasUsuario, alertaAñadida]);
  
      // Filtra alertasDisponibles para eliminar la alerta añadida
      setAlertasDisponibles(
        alertasDisponibles.filter((alerta) => alerta.id !== id)
      );
    }
  
    // Añadimos la alerta a la lista de añadidas
    setAlertasAdd([...alertasAdd, id]);
  };
  
  const handleRemoveAlerta = (id) => {
    // Si la alerta ya estaba añadida, la eliminamos de la lista de añadidas
    if (alertasAdd.includes(id)) {
      setAlertasAdd(alertasAdd.filter(alertaId => alertaId !== id));
    } else {
      // Encuentra la alerta con el ID correspondiente en alertasUsuario
      const alertaQuitada = alertasUsuario.find(alerta => alerta.id === id);
  
      // Actualiza alertasDisponibles añadiendo la alerta quitada
      setAlertasDisponibles([...alertasDisponibles, alertaQuitada]);
    
      // Filtra alertasUsuario para eliminar la alerta quitada
      setAlertasUsuario(alertasUsuario.filter(alerta => alerta.id !== id));
    }
  
    // Añadimos la alerta a la lista de quitadas
    setAlertasQuitadas([...alertasQuitadas, id]);
  }

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
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {alerta.descripcion}
                      </Typography>
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
                No tienes alertas
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
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
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {alerta.descripcion}
                      </Typography>
                      <Button onClick={() => handleAddAlertas(alerta.id)}>
                        <AddIcon/>
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
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
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
