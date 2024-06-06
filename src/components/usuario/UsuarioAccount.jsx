import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/usuarioAccount.module.css";

export const UsuarioAccount = () => {
  const username = useAuth().getUser();
  const id = useAuth().getId();
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/${id}`, {
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
    navigate(`/usuario/edit/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <Card className={`shadow-lg border-0 ${styles.card}`}>
          <Card.Body className={styles["card-body"]}>
            <Row>
              <Col xs={12} md={4} className="text-center">
                <div className={`mb-3 ${styles["avatar-icon"]}`}>
                  <FontAwesomeIcon icon={faUser} size="7x" />
                </div>
                <h5 className="text-primary">{usuario.username}</h5>
                <Button variant="outline-primary" onClick={handleEdit} className="mt-3">
                  <FontAwesomeIcon icon={faEdit} className="me-2" />
                  Editar Perfil
                </Button>
              </Col>
              <Col xs={12} md={8}>
                <h6 className="text-muted mb-3">Información de perfil</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} className="me-3 text-secondary" />
                    <strong>Nombre completo:</strong> <span className="ms-2">{usuario.nombreReal}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="me-3 text-secondary" />
                    <strong>Correo:</strong> <span className="ms-2">{usuario.correo}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faPhone} className="me-3 text-secondary" />
                    <strong>Número de teléfono:</strong> <span className="ms-2">{usuario.numeroTelefono}</span>
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