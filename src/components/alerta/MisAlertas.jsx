import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { NavbarGeneral } from "../NavbarGeneral";
import { FaTrash, FaEdit, FaPlus, FaMinus } from "react-icons/fa";

export const MisAlertas = () => {
  const [alertasUsuario, setAlertasUsuario] = useState([]);
  const [alertasDisponibles, setAlertasDisponibles] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const idUser = useAuth().getId();
  const rol = useAuth().getRol();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/${idUser}/alertas`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAlertasUsuario(data ? data : []);
        });

      fetch(`http://localhost:9090/usuario/${idUser}/alertasDisponibles`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAlertasDisponibles(data ? data : []);
        });
    }
  }, [token, idUser, navigate]);

  const handleAddAlertas = (id) => {
    fetch(`http://localhost:9090/usuario/${idUser}/${id}/true`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const alertaAñadida = alertasDisponibles.find((alerta) => alerta.id === id);

    setAlertasUsuario([...alertasUsuario, alertaAñadida]);

    setAlertasDisponibles(
      alertasDisponibles.filter((alerta) => alerta.id !== id)
    );
  };

  const handleRemoveAlerta = (id) => {
    fetch(`http://localhost:9090/usuario/${idUser}/${id}/false`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const alertaQuitada = alertasUsuario.find((alerta) => alerta.id === id);

    setAlertasUsuario(alertasUsuario.filter((alerta) => alerta.id !== id));

    setAlertasDisponibles([...alertasDisponibles, alertaQuitada]);
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <h4 className="mb-4">Mis Alertas</h4>
        <Row>
          <Col md={6}>
            <h5>Alertas Disponibles</h5>
            {alertasDisponibles.length > 0 ? (
              <Row className="g-4">
                {alertasDisponibles.map((alerta) => (
                  <Col key={alerta.id} xs={12}>
                    <Card>
                      <Card.Body className="text-center">
                        <Card.Title>{alerta.nombre}</Card.Title>
                        <Card.Text>{alerta.descripcion}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Button
                          variant="outline-primary"
                          onClick={() => handleAddAlertas(alerta.id)}
                        >
                          <FaPlus /> Añadir
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Card className="mt-4">
                <Card.Body className="text-center">
                  <h6>No hay alertas disponibles</h6>
                  <p>Intenta más tarde.</p>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={6}>
            <h5>Tus Alertas</h5>
            {alertasUsuario.length > 0 ? (
              <Row className="g-4">
                {alertasUsuario.map((alerta) => (
                  <Col key={alerta.id} xs={12}>
                    <Card>
                      <Card.Body className="text-center">
                        <Card.Title>{alerta.nombre}</Card.Title>
                        <Card.Text>{alerta.descripcion}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Button
                          variant="outline-danger"
                          onClick={() => handleRemoveAlerta(alerta.id)}
                        >
                          <FaMinus /> Eliminar
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Card className="mt-4">
                <Card.Body className="text-center">
                  <h6>No tienes alertas</h6>
                  <p>Intenta añadir algunas alertas.</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
