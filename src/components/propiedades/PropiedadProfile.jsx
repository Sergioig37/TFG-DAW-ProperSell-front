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
import { useParams, useNavigate } from "react-router-dom";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const PropiedadProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [propiedad, setPropiedad] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/propiedad/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedad(data);
          fetch(`http://localhost:9090/clienteNumero/${data.id}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then((res) => res.json()) 
            .then((data) => setNumeroTelefono(data.numeroTelefono)); 
        });
    }
  }, [id, token, navigate]);

  const handleEdit = () => {
    navigate(`/propiedad/edit/${id}`);
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
                {propiedad.tipo ? propiedad.tipo[0] : "P"}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {propiedad.tipo}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Editar Propiedad
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Información de la Propiedad
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Localización:</strong> {propiedad.localizacion}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Precio:</strong> {propiedad.precio}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Contactar al dueño:</strong> {numeroTelefono}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
