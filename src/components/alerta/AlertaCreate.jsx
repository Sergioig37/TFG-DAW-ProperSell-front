import React, { useEffect, useState } from "react";
import { FormControl, Button, Container, Row, Col, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export const AlertaCreate = () => {
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState({}); // State to manage errors
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      }
    }
  }, [token, rol, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check for empty fields
    if (!nombre.trim() || !descripcion.trim()) {
      setErrors({ message: "Por favor, complete todos los campos." });
      return;
    } else if (nombre.length < 4 || descripcion.length < 4) {
      setErrors({ message: "El nombre y la descripción no pueden tener menos de cuatro caracteres." });
      return;
    }

    const data = {
      descripcion: descripcion,
      nombre: nombre
    };

    fetch(import.meta.env.VITE_LOCALHOST_URL + `alerta/save`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al enviar la alerta.');
        }
      })
      .then(() => {
        navigate(-1);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrors({ message: "Error al enviar la alerta. Por favor, inténtelo de nuevo más tarde." });
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
                <Form.Label>Nombre (Mínmio 4 caracteres)</Form.Label>
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
                <Form.Label>Descripción (Mínimo 4 caracteres)</Form.Label>
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
