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
import env from "../../env";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setAuthPassword } = useAuth();
  const [error, setError] = useState(null);
  const token = useAuth().getToken();
  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
    navigate("/");
  };

  const handleLogin = () => {
    fetch(env.LOCALHOST_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    }).then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        return response.json();
      })
      .then((data) => {
        setAuthPassword(password);
        setToken(data.token);
        handleSuccessfulLogin();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              {error ? (
                <Alert variant="danger" className="mt-2">
                  {error}
                </Alert>
              ) : (
                <></>
              )}

              <Card.Title className="text-center mb-4">
                Iniciar sesión
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4" block>
                  Iniciar Sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-3">
            <Alert variant="secondary">
              ¿No tienes cuenta?{" "}
              <Alert.Link href="/register">Regístrate ahora</Alert.Link>
            </Alert>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
