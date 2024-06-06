import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/");
  };

  return (
    <Container className="text-center mt-5">
      <h1>No estás autorizado para acceder a esta página</h1>
      <p className="lead">
        Lo sentimos, no tienes permisos para ver esta página. Por favor, vuelve
        al inicio.
      </p>
      <Button variant="primary" onClick={handleVolver}>
        Volver a inicio
      </Button>
    </Container>
  );
};
