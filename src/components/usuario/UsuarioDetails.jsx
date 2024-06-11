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
import env from "../../../env";

export const UsuarioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [usuario, setUsuario] = useState({});
  const rol = useAuth().getRol();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      } else {
        fetch(env.LOCALHOST_URL + `usuario/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            if (!res.ok) {
              navigate("/*");
            } else {
              return res.json();
            }
          })
          .then((data) => {
            if (data) {
              setUsuario(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
      }
    }
  }, [id, navigate, token, rol]);
  

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
                <Button variant="primary" onClick={() => navigate(-1)}>
                  Volver
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
