import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const PropiedadCreate = () => {
  const [tipo, setTipo] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [precio, setPrecio] = useState("");
  const [errors, setErrors] = useState({});
  const token = useAuth().getToken();
  const idUser = useAuth().getId();
  const rol = useAuth().getRol();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (rol === "ADMIN") {
      navigate("/denegado");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos enviados:", { tipo, localizacion, precio });
      const data = {
        tipo: tipo,
        localizacion: localizacion,
        precio: precio,
        propietario: idUser,
        habilitado: true
      };

      fetch('http://localhost:9090/propiedad/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!tipo.trim()) {
      errors["tipo"] = "Ingrese el tipo de propiedad";
    }

    if (!localizacion.trim()) {
      errors["localizacion"] = "Ingrese la localización de la propiedad";
    }

    if (!precio.trim()) {
      errors["precio"] = "Ingrese el precio de la propiedad";
    } else if (!/^\d+$/.test(precio)) {
      errors["precio"] = "El precio debe contener solo números";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Form is valid if there are no errors
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="tipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el tipo de propiedad"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                isInvalid={!!errors["tipo"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["tipo"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="localizacion">
              <Form.Label>Localización</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la localización de la propiedad"
                value={localizacion}
                onChange={(e) => setLocalizacion(e.target.value)}
                isInvalid={!!errors["localizacion"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["localizacion"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el precio de la propiedad"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                isInvalid={!!errors["precio"]}
              />
              <Form.Control.Feedback type="invalid">
                {errors["precio"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
