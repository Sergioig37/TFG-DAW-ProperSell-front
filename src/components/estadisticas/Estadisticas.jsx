import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { NavbarGeneral } from "../NavbarGeneral";

export const Estadisticas = () => {
  const [propiedadesMasCaras, setPropiedadesMasCaras] = useState(null);
  const [usuariosConXAlertas, setUsuariosConXAlertas] = useState(null);
  const [usuariosConMasDeUnaPropiedad, setUsuariosConMasDeUnaPropiedad]=useState(null);
  const [alertasPopulares, setAlertasPopulares] = useState(null);
  const [usuariosBaneados, setUsuariosBaneados] = useState(null);
  const [alertasLargas, setAlertasLargas] = useState(null);
  const [numeroAlertas, setNumeroAlertas] = useState(0);
  const [precioPropiedad, setPrecioPropiedad] = useState(0);
  const [tamanoDescripcion, setTamanoDescripcion] = useState(0);

  const handleVerPropiedadesMasCaras = () => {
    fetch(
      `http://localhost:9090/estadisticas/propiedadMasCarasDe/${precioPropiedad}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPropiedadesMasCaras(data.length);
      });
  };

  const handleVerUsuariosConXAlertas = () => {
    fetch(
      `http://localhost:9090/estadisticas/usuarioConMasDe/${numeroAlertas}/alertas`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUsuariosConXAlertas(data.length);
      });
  };

  useEffect(() => {
    fetch("http://localhost:9090/estadisticas/usuario/variasPropiedades", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuariosConMasDeUnaPropiedad(data.length);
      });

    fetch("http://localhost:9090/estadisticas/alertas/variosUsuarios", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAlertasPopulares(data.length);
      });

    fetch("http://localhost:9090/estadisticas/usuarios/baneados", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuariosBaneados(data.length);
      });
  }, []);

  const handleVerAlertasLargas = () => {
    fetch(`http://localhost:9090/estadisticas/alertas/${tamanoDescripcion}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAlertasLargas(data.length);
      });
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Estadísticas
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5">
            Número de Propiedades que cuestan más de:
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Precio"
                type="number"
                value={precioPropiedad}
                onChange={(e) => setPrecioPropiedad(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleVerPropiedadesMasCaras}
              >
                Ver
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body1">
            Cantidad: {propiedadesMasCaras}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">Usuarios con Más de X Alertas:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Número de Alertas"
                type="number"
                value={numeroAlertas}
                onChange={(e) => setNumeroAlertas(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleVerUsuariosConXAlertas}
              >
                Ver
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body1">
            Cantidad: {usuariosConXAlertas}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            Usuarios con Más de Una Propiedad:
          </Typography>
          <Typography variant="body1">
            Cantidad: {usuariosConMasDeUnaPropiedad}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            Alertas con más de una suscripción:
          </Typography>
          <Typography variant="body1">Cantidad: {alertasPopulares}</Typography>
        </Box>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">Usuarios Baneados:</Typography>
          <Typography variant="body1">Cantidad: {usuariosBaneados}</Typography>
        </Box>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            Alertas con más de X número de caracteres:
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tamaño de Descripción"
                type="number"
                value={tamanoDescripcion}
                onChange={(e) => setTamanoDescripcion(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleVerAlertasLargas}>
                Ver
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body1">Cantidad: {alertasLargas}</Typography>
        </Box>
      </Container>
    </>
  );
};
