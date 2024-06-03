import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Box,
  Paper
} from "@mui/material";
import { NavbarGeneral } from "./NavbarGeneral";
import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Explorar = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [localizacion, setLocalizacion] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const navigate = useNavigate();
  const user = useAuth().getUser();
  const token = useAuth().getToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // Aquí puedes cargar todas las propiedades disponibles inicialmente
      fetch(`http://localhost:9090/propiedadExcluida/${user}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data);
        });
    }
  }, [token]);

  const handleVer = (id) => {
    // Navega a la ruta de edición
    navigate(`/propiedad/${id}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    // Realiza el filtrado de propiedades en función de los criterios de búsqueda
    const filteredPropiedades = propiedades.filter((propiedad) => {
      // Filtra por localización
      if (localizacion && propiedad.localizacion !== localizacion) {
        return false;
      }
      // Filtra por precio mínimo
      if (precioMin && propiedad.precio < precioMin) {
        return false;
      }
      // Filtra por precio máximo
      if (precioMax && propiedad.precio > precioMax) {
        return false;
      }
      return true;
    });

    if (localizacion == "" && precioMax == "" && precioMin == "") {
      window.location.reload();
    }

    setLocalizacion("");
    setPrecioMin("");
    setPrecioMax("");

    // Actualiza el estado con las propiedades filtradas
    setPropiedades(filteredPropiedades);
  };

  const handleBorrarFiltros = () => {
    window.location.reload();
  }

  return (
    <>
    <NavbarGeneral />
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Explorar Propiedades
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Localización"
                value={localizacion}
                onChange={(e) => setLocalizacion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Precio Mínimo"
                type="number"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Precio Máximo"
                type="number"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: "100%" }}
              >
                Filtrar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleBorrarFiltros}
                sx={{ height: "100%" }}
              >
                Borrar Filtros
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {propiedades.length >= 1 ? (
        <Grid container spacing={4}>
          {propiedades.map((propiedad) => (
            <Grid item key={propiedad.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Imagen de la propiedad"
                  height="140"
                  image="/path/to/default/image.jpg" // Sustituye esto con el atributo propiedad.imagen si tienes la URL de la imagen
                />
                <CardContent>
                  <Typography variant="h6">{propiedad.tipo}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {propiedad.localizacion}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    ${propiedad.precio}
                  </Typography>
                  <Button onClick={() => handleVer(propiedad.id)}>
                    Ver propiedad
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
        >
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Sin resultados
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Intenta ajustar tus filtros de búsqueda.
          </Typography>
        </Box>
      )}
    </Container>
  </>
  );
};
