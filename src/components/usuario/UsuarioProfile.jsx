import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export const UsuarioProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [usuario, setUsuario] = useState({});
  const  user  = useAuth().getUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/${username}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsuario(data);
        });
    }
  }, [username]);

  const handleEdit = () => {
    navigate(`/`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="md" sx={{ marginTop: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 120, height: 120, mb: 2 }}>
                {usuario.username ? usuario.username[0] : "C"}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {usuario.username}
              </Typography>
              {/* Aquí puedes agregar más detalles según la información del cliente */}
              <Divider sx={{ my: 2 }} />
              {user == usuario.username ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Editar Perfil
                </Button>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Información de perfil
              </Typography>
              {/* Puedes mostrar más detalles de contacto aquí */}
              <Typography variant="body1" gutterBottom>
                <strong>Nombre completo:</strong> {usuario.nombreReal}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Correo:</strong> {usuario.correo}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
