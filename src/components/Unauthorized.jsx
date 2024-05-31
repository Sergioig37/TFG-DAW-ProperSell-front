import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/explore");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        No estás autorizado para acceder a esta página
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lo sentimos, no tienes permisos para ver esta página. Por favor, vuelve
        al inicio.
      </Typography>
      <Button variant="contained" onClick={handleVolver}>
        Volver a inicio
      </Button>
    </Container>
  );
};


