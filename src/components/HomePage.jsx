import React, { useEffect } from 'react';
import { Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions, Box } from '@mui/material';
import { NavbarGeneral } from './NavbarGeneral';
import { useAuth } from "./auth/AuthContext";
// Imagina que tienes un array de propiedades para mostrar


export const HomePage = () => {
    const token = useAuth().getToken();
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
      }, []);

    return (
        <>
        <NavbarGeneral/>
        <Box sx={{ flexGrow: 1, height: '100vh' }}>
            <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box my={4} sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Encuentra tu hogar perfecto
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Ver Propiedades
                    </Button>
                </Box>
                <Grid container spacing={4} sx={{ flexGrow: 1 }}>
                    {propiedades.map((propiedad) => (
                        <Grid item key={propiedad.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={propiedad.imagen}
                                    alt={propiedad.titulo}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {propiedad.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {propiedad.descripcion}
                                    </Typography>
                                    <Typography variant="h6">
                                        {propiedad.precio}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Ver Más
                                    </Button>
                                    <Button size="small" color="primary">
                                        Contactar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box bgcolor="text.secondary" color="white" sx={{ p: 3 }}>
                    <Typography variant="body1" align="center" gutterBottom>
                        © 2024 Propiedades en Venta. Todos los derechos reservados.
                    </Typography>
                </Box>
            </Container>
        </Box>
        </>
    );
}
