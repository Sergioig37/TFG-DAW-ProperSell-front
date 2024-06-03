import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Avatar, Button, Paper, Divider } from "@mui/material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const UsuarioAccount = () => {
  const  username  = useAuth().getUser();
  console.log(username)
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    if(!token){
      navigate("/login");
    }
    else{
      fetch(`http://localhost:9090/usuario/${username}`,{
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
      });
    }
    
  }, [username]);

  const handleEdit = () => {
    navigate(`/usuario/edit/${username}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Perfil del Usuario */}
          <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ width: 120, height: 120, mb: 2, bgcolor: "primary.main" }}>
              {usuario.username ? usuario.username[0] : "C"}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {usuario.username}
            </Typography>
            <Divider sx={{ width: '100%', my: 2 }} />
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Editar Perfil
            </Button>
          </Grid>
          
          {/* Información del Perfil */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Información de perfil
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" gutterBottom>
              <strong>Nombre completo:</strong> {usuario.nombreReal}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Correo:</strong> {usuario.correo}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
};
