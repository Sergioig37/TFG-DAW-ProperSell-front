import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const UsuarioDetails = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [usuario, setUsuario] = useState({});
  const user = useAuth().getUser();
  const rol = useAuth().getRol();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      }
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
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12} md={4} className="text-center">
                <div className="avatar-icon">
                  <FontAwesomeIcon icon={faUser} size="7x" />
                </div>
                <h5>{usuario.username}</h5>
                {user === usuario.username && (
                  <Button variant="primary" onClick={handleEdit}>
                    Editar Perfil
                  </Button>
                )}
              </Col>
              <Col xs={12} md={8}>
                <h6>Información de perfil</h6>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Nombre completo:</strong> {usuario.nombreReal}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Correo:</strong> {usuario.correo}
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
