import React, { useEffect, useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import env from "../../../env";

export const AlertaUpdate = () => {
  const { id } = useParams();
  const [idAlerta, setIdAlerta] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errors, setErrors] = useState({}); // State to manage errors
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol === "ADMIN") {
        fetch(env.LOCALHOST_URL+ `alerta/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setNombre(data.nombre);
            setDescripcion(data.descripcion);
            setIdAlerta(data.id);
          });
      } else {
        navigate("/denegado");
      }
    }
  }, [id, token, rol, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation check for empty fields
    if (!nombre.trim() || !descripcion.trim()) {
      setErrors({ message: "Por favor, complete todos los campos." });
      return;
    }
     
    else if (nombre.length < 4 || descripcion.length < 4) {
      setErrors({ message: "El nombre y la descripción no pueden tener menos de cuatro caracteres." });
      return;
    }

    const data = {
      id: idAlerta,
      nombre: nombre,
      descripcion: descripcion,
    };

    fetch(env.LOCALHOST_URL+`alerta/edit/${data.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
    .then(() => {
      navigate(-1);
    })
    .catch(error => {
      console.error('Error:', error);
      setErrors({ message: "Error al actualizar la alerta. Por favor, inténtelo de nuevo más tarde." });
    });
  };

  return (
    <>
      <Container className="mt-4" style={{ maxWidth: '600px' }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Error message */}
            {errors.message && (
              <Col xs={12}>
                <Alert variant="danger">{errors.message}</Alert>
              </Col>
            )}
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  isInvalid={!!errors.descripcion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descripcion}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} className="d-flex justify-content-between">
              <Button type="submit" variant="primary">
                Guardar
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Volver
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      
    </>
  );
};
