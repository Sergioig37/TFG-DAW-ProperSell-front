import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();

  const handleAlertaRoute = () => {
    navigate("/admin/alerta-dashboard");
  };

  const handlePropiedades = () => {
    navigate("/admin/propiedades-dashboard");
  };

  const handleUsuarios = () => {
    navigate("/admin/usuarios-dashboard");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      }
    }
  }, [token, rol, navigate]);

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Card>
              <Card.Header as="h5" className="text-center">
                Panel de Control
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Alertas</span>
                  <Button variant="primary" onClick={handleAlertaRoute}>
                    Ver Dashboard
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Propiedades</span>
                  <Button variant="primary" onClick={handlePropiedades}>
                    Ver Dashboard
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>Usuarios</span>
                  <Button variant="primary" onClick={handleUsuarios}>
                    Ver Dashboard
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
