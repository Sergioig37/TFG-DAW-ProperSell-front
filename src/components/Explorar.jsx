import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia, TextField, MenuItem, Button } from "@mui/material";

export const Explorar = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [tipo, setTipo] = useState("");
  const [localizacion, setLocalizacion] = useState("");

  useEffect(() => {
    fetch("http://localhost:9090/propiedad")
      .then((res) => res.json())
      .then((data) => {
        setPropiedades(data);
      });
  }, []);

  const handleSearch = () => {
    let url = "http://localhost:9090/propiedades?";
    if (tipo) url += `tipo=${tipo}&`;
    if (localizacion) url += `localizacion=${localizacion}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPropiedades(data);
      });
  };

  return (
    <>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Explorar Propiedades
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="venta">Venta</MenuItem>
            <MenuItem value="alquiler">Alquiler</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Localización"
            value={localizacion}
            onChange={(e) => setLocalizacion(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ height: "100%" }}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {propiedades.map((propiedad) => (
          <Grid item key={propiedad.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Imagen de la propiedad"
                height="140"
                image="/path/to/default/image.jpg" // Aquí puedes poner una imagen por defecto o el atributo propiedad.imagen si tienes la URL de la imagen
              />
              <CardContent>
                <Typography variant="h6">{propiedad.tipo}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {propiedad.localizacion}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  ${propiedad.precio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
};


