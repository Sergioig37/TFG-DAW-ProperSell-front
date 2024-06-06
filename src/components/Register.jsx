import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    correo: "",
    nombreReal: "",
    numeroTelefono: "",
  });
  const [errors, setErrors] = useState({});
  const token = useAuth().getToken();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      fetch("http://localhost:9090/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            navigate("/login");
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .catch((error) => {
          if (error.message.includes("correo")) {
            setError(error.message);
          } else {
            setError(error.message);
          }
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!values.nombreReal.trim()) {
      formIsValid = false;
      errors["nombreReal"] = "Ingrese su nombre completo";
    }

    if (!values.username.trim()) {
      formIsValid = false;
      errors["username"] = "Ingrese un nombre de usuario";
    }

    if (!values.password.trim()) {
      formIsValid = false;
      errors["password"] = "Ingrese una contraseña";
    }

    if (!values.correo.trim()) {
      formIsValid = false;
      errors["correo"] = "Ingrese su correo electrónico";
    } else if (!/\S+@\S+\.\S+/.test(values.correo)) {
      formIsValid = false;
      errors["correo"] = "Ingrese un correo electrónico válido";
    }

    if (!values.numeroTelefono.trim()) {
      formIsValid = false;
      errors["numeroTelefono"] = "Ingrese su número de teléfono";
    } else if (!/^\d+$/.test(values.numeroTelefono)) {
      formIsValid = false;
      errors["numeroTelefono"] =
        "El número de teléfono debe contener solo números";
    } else if (values.numeroTelefono.trim().length !== 9) {
      formIsValid = false;
      errors["numeroTelefono"] = "El número de teléfono debe tener 9 dígitos";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Registro de Usuario
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombreReal">
                  <Form.Label>Nombre real</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreReal"
                    value={values.nombreReal}
                    onChange={handleChange}
                    isInvalid={!!errors.nombreReal}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombreReal}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="username" className="mt-3">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                  {error && error.includes("usuario") && (
                    <Alert variant="danger" className="mt-2">
                      {error}
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="correo" className="mt-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="correo"
                    value={values.correo}
                    onChange={handleChange}
                    isInvalid={!!errors.correo}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.correo}
                  </Form.Control.Feedback>
                  {error && error.includes("correo") && (
                    <Alert variant="danger" className="mt-2">
                      {error}
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group controlId="numeroTelefono" className="mt-3">
                  <Form.Label>Número de teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroTelefono"
                    value={values.numeroTelefono}
                    onChange={handleChange}
                    isInvalid={!!errors.numeroTelefono}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.numeroTelefono}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4" block>
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-3">
            <Alert variant="secondary">
              ¿Ya tienes cuenta?{" "}
              <Alert.Link href="/login">Inicia sesión</Alert.Link>
            </Alert>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
