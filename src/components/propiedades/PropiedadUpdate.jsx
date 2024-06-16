import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export const PropiedadUpdate = () => {
  const { id } = useParams();
  const [idPropiedad, setIdPropiedad] = useState(0);
  const [tipo, setTipo] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [precio, setPrecio] = useState("");
  const token = useAuth().getToken();
  const navigate = useNavigate();
  const idUser = useAuth().getId();
  const user = useAuth().getUser();
  const rol = useAuth().getRol();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if(rol!=="USER"){
        navigate("/denegado");
      }
      fetch(import.meta.env.VITE_LOCALHOST_URL + `propiedad/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(import.meta.env.VITE_LOCALHOST_URL + `propiedad/propietario/${id}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          })
            .then((res) => res.json())
            .then((propiedadData) => {
              if (propiedadData.id !== idUser) {
                navigate("/denegado");
              } else {
                setTipo(data.tipo);
                setLocalizacion(data.localizacion);
                setPrecio(data.precio);
                setIdPropiedad(data.id);
              }
            });
        });
    }
  }, [id, token, navigate, idUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos enviados:", { tipo, localizacion, precio });
      var data = {
        id: idPropiedad,
        tipo: tipo,
        localizacion: localizacion,
        precio: precio,
      };

      fetch(import.meta.env.VITE_LOCALHOST_URL + `propiedad/edit/${data.id}/${user}`, {
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
        .catch((error) => {
          console.error("Error al actualizar los datos:", error);
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!tipo.trim()) {
      errors["tipo"] = "Ingrese el tipo de propiedad.";
    } else if (tipo.length < 4) {
      errors["tipo"] = "Tipo no puede tener menos de cuatro caracteres.";
    } else if (/\d/.test(tipo)) {
      errors["tipo"] = "El tipo no puede contener números.";
    }

    if (!localizacion.trim()) {
      formIsValid = false;
      errors["localizacion"] = "Ingrese la localización de la propiedad.";
    }

    console.log(typeof(precio));
    let precioNumber = precio;
    if (!precio.trim()) {
      formIsValid = false;
      errors["precio"] = "Ingrese el precio de la propiedad.";
    } else if (!/^\d+$/.test(precio)) {
      formIsValid = false;
      errors["precio"] = "El precio debe contener solo números.";
    }else if (parseInt(precioNumber) < 1000) {
      formIsValid = false;
      errors["precio"] = "El precio no puede ser menos de 1000 euros";
    }
    else if(parseInt(precioNumber) > 300000){
      formIsValid = false;
      errors["precio"] = "El precio no puede ser más de 300000 euros";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <>
      <Container className="mt-4" style={{ maxWidth: "600px" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Error message */}
            {Object.keys(errors).length > 0 && (
              <Col xs={12}>
                <Alert variant="danger">
                  {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </Alert>
              </Col>
            )}
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formTipo">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el tipo de propiedad"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  isInvalid={!!errors.tipo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tipo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formLocalizacion">
                <Form.Label>Localización</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la localización de la propiedad"
                  value={localizacion}
                  onChange={(e) => setLocalizacion(e.target.value)}
                  isInvalid={!!errors.localizacion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.localizacion}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formPrecio">
                <Form.Label>Precio (Min: 1000, Max:300000)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el precio de la propiedad"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  isInvalid={!!errors.precio}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.precio}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button type="submit" variant="primary" className="me-2">
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
