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
  Paper,
} from "@mui/material";
import { NavbarGeneral } from "./NavbarGeneral";
import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles/explorar.css";

export const Explorar = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [localizacion, setLocalizacion] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const navigate = useNavigate();
  const user = useAuth().getUser();
  const token = useAuth().getToken();

  useEffect(() => {
    // Aquí puedes cargar todas las propiedades disponibles inicialmente
    if (token) {
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
    } else {
      fetch(`http://localhost:9090/propiedad`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data);
        });
    }
  }, [token]);

  const handleVer = (id) => {
    // Navega a la ruta de edición

    if (token) {
      navigate(`/propiedad/${id}`);
    } else {
      navigate("/login");
    }
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

    

    // Actualiza el estado con las propiedades filtradas
    setPropiedades(filteredPropiedades);
  };

  const handleBorrarFiltros = () => {
    window.location.reload();
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="lg" className="container">
        <Typography variant="h4" gutterBottom className="explorar-heading">
          Explorar Propiedades
        </Typography>

        <Paper elevation={3} className="explorar-paper">
          <form onSubmit={handleSearch}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Localización"
                  value={localizacion}
                  onChange={(e) => setLocalizacion(e.target.value)}
                  variant="outlined"
                  className="explorar-textfield"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Precio Mínimo"
                  type="number"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                  variant="outlined"
                  className="explorar-textfield"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Precio Máximo"
                  type="number"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                  variant="outlined"
                  className="explorar-textfield"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="explorar-button-submit"
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
                  className="explorar-button-clear"
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
                <Card className="explorar-card">
                  <CardContent className="explorar-card-content">
                    <Typography variant="h6" className="explorar-card-title">
                      {propiedad.tipo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {propiedad.localizacion}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      ${propiedad.precio}
                    </Typography>
                    {token ? (
                      <Button
                        onClick={() => handleVer(propiedad.id)}
                        className="explorar-button-view"
                      >
                        Ver propiedad
                      </Button>
                    ) : (
                      <></>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box className="explorar-no-results-box">
            <Typography variant="h6" className="explorar-no-results-title">
              Sin resultados
            </Typography>
            <Typography variant="body1" className="explorar-no-results-text">
              Intenta ajustar tus filtros de búsqueda.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};
