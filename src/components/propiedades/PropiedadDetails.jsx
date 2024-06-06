import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const PropiedadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const user = useAuth().getUser();
  const [propietario, setPropietario] = useState("");
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
          fetch(`http://localhost:9090/propiedad/propietario/${id}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then((res) => res.json())
            .then((data) => setPropietario(data.username));

          setPropiedad(data);

          fetch(`http://localhost:9090/usuarioInfoContacto/${user}`, {
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
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12} md={4} className="text-center">
              
                <h5>{propiedad.tipo}</h5>
                {propietario === user && (
                  <Button
                    variant="primary"
                    onClick={handleEdit}
                    style={{ backgroundColor: "#3f51b5" }}
                  >
                    Editar Propiedad
                  </Button>
                )}
              </Col>
              <Col xs={12} md={8}>
                <h6>Información de la Propiedad</h6>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Localización:</strong> {propiedad.localizacion}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Precio:</strong> {propiedad.precio}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contactar al dueño:</strong>{" "}
                    {numeroTelefono}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
