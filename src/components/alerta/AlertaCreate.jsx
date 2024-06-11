import React, { useEffect, useState } from "react";
import { FormControl, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import env from "../../../env";

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

    fetch(env.LOCALHOST_URL + `alerta/save`, {
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
    <Container fluid className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            {/* Error message */}
            {errors.message && <Alert variant="danger">{errors.message}</Alert>}
            <FormControl
              className="mb-3"
              placeholder="Nombre de la alerta"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              isInvalid={errors.nombre}
            />
            <FormControl.Feedback type="invalid">
              {errors.nombre}
            </FormControl.Feedback>
            <FormControl
              as="textarea"
              rows={3}
              className="mb-3"
              placeholder="Descripción de la alerta"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              isInvalid={errors.descripcion}
            />
            <FormControl.Feedback type="invalid">
              {errors.descripcion}
            </FormControl.Feedback>
            <Button type="submit" variant="primary" className="me-2">
              Guardar
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
    
    </>
  );
};
