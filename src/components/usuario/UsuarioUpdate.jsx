import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavbarGeneral } from "../NavbarGeneral";

export const UsuarioUpdate = () => {
  const [correo, setCorreo] = useState("");
  const [nombreReal, setNombreReal] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const token = useAuth().getToken();
  const passwrd = useAuth().getAuthPassword();
  const idUser = useAuth().getId();
  const user = useAuth().getUser();
  const { setToken, setAuthPassword } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(import.meta.env.VITE_LOCALHOST_URL + `usuario/${idUser}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
          }
          return response.json();
        })
        .then((data) => {
          setCorreo(data.correo);
          setNombreReal(data.nombreReal);
          setNumeroTelefono(data.numeroTelefono ? data.numeroTelefono : "");
          setPassword(passwrd);
          setUsername(data.username);
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error fetching user data:", error);
        });
    }
  }, [idUser, token, navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        id: idUser,
        username: username,
        correo: correo,
        nombreReal: nombreReal,
        numeroTelefono: numeroTelefono,
        password: password,
      };
      fetch(
        import.meta.env.VITE_LOCALHOST_URL + `usuario/edit/${idUser}/${user}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
          }
          return response.json();
        })
        .then((res) => {
          if (res.token) {
            setAuthPassword(data.password);
            setToken(res.token);
          }
          navigate(-1, { replace: true });
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error fetching user data:", error);
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!username.trim()) {
      formIsValid = false;
      errors["username"] = "Ingrese un nombre de usuario";
    }

    if (!nombreReal.trim()) {
      formIsValid = false;
      errors["nombreReal"] = "Ingrese su nombre real";
    }

    if (!correo.trim()) {
      formIsValid = false;
      errors["correo"] = "Ingrese su correo electrónico";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      formIsValid = false;
      errors["correo"] = "Ingrese un correo electrónico válido";
    }

    if (!numeroTelefono.trim()) {
      formIsValid = false;
      errors["numeroTelefono"] = "Ingrese su número de teléfono";
    } else if (!/^\d+$/.test(numeroTelefono)) {
      formIsValid = false;
      errors["numeroTelefono"] =
        "El número de teléfono debe contener solo números";
    } else if (numeroTelefono.trim().length !== 9) {
      formIsValid = false;
      errors["numeroTelefono"] = "El número de teléfono debe tener 9 dígitos";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="mb-4">Actualizar Usuario</h2>
            <Form onSubmit={handleSubmit}>
              {Object.keys(errors).length > 0 && (
                <Alert variant="danger">
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </Alert>
              )}
              {error ? (
                <Alert variant="danger" className="mt-2">
                  {error}
                </Alert>
              ) : (
                <></>
              )}

              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={!!errors["username"]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors["username"]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="nombreReal" className="mb-3">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre real"
                  value={nombreReal}
                  onChange={(e) => setNombreReal(e.target.value)}
                  isInvalid={!!errors["nombreReal"]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors["nombreReal"]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="numeroTelefono" className="mb-3">
                <Form.Label>Número de Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su número de teléfono"
                  value={numeroTelefono}
                  onChange={(e) => setNumeroTelefono(e.target.value)}
                  isInvalid={!!errors["numeroTelefono"]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors["numeroTelefono"]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="correo" className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  isInvalid={!!errors["correo"]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors["correo"]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors["password"]}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors["password"]}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="me-2">
                Guardar
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Volver
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
