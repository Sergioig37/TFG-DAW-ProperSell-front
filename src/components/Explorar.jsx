import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { NavbarGeneral } from "./NavbarGeneral";
import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles/explorar.css";

export const Explorar = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [localizacion, setLocalizacion] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const navigate = useNavigate();
  const user = useAuth().getUser();
  const token = useAuth().getToken();

  useEffect(() => {
    // Carga las propiedades disponibles inicialmente
    if (token) {
      fetch(`http://localhost:9090/propiedadExcluida/${user}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data);
        });
    } else {
      fetch(`http://localhost:9090/propiedad`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data);
        });
    }
  }, [token]);

  const handleVer = (id) => {
    // Navega a la ruta de edición
    if (token) {
      navigate(`/propiedad/${id}`);
    } else {
      navigate("/login");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Filtra las propiedades según los criterios de búsqueda
    const filteredPropiedades = propiedades.filter((propiedad) => {
      if (localizacion && propiedad.localizacion !== localizacion) {
        return false;
      }
      if (precioMin && propiedad.precio < precioMin) {
        return false;
      }
      if (precioMax && propiedad.precio > precioMax) {
        return false;
      }
      return true;
    });

    if (localizacion === "" && precioMax === "" && precioMin === "") {
      window.location.reload();
    }

    // Actualiza el estado con las propiedades filtradas
    setPropiedades(filteredPropiedades);
  };

  const handleBorrarFiltros = () => {
    window.location.reload();
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <h4 className="mb-4">Explorar Propiedades</h4>

        <Form onSubmit={handleSearch}>
          <Row className="mb-3">
            <Col xs={12} sm={6} md={3}>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Localización"
                  value={localizacion}
                  onChange={(e) => setLocalizacion(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <FormGroup>
                <FormControl
                  type="number"
                  placeholder="Precio Mínimo"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <FormGroup>
                <FormControl
                  type="number"
                  placeholder="Precio Máximo"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Button type="submit" variant="primary">
                Filtrar
              </Button>
              <Button
                variant="secondary"
                onClick={handleBorrarFiltros}
                className="ms-2"
              >
                Borrar Filtros
              </Button>
            </Col>
          </Row>
        </Form>

        {propiedades.length >= 1 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {propiedades.map((propiedad) => (
              <Col key={propiedad.id}>
                <Card className="mt-4">
                  <Card.Body>
                    <Card.Title>{propiedad.tipo}</Card.Title>
                    <Card.Text>{propiedad.localizacion}</Card.Text>
                    {token && <Card.Text>${propiedad.precio}</Card.Text>}
                    {token && (
                      <Button onClick={() => handleVer(propiedad.id)} variant="primary">
                        Ver propiedad
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="mt-4">
            <p>Sin resultados</p>
            <p>Intenta ajustar tus filtros de búsqueda.</p>
          </div>
        )}
      </Container>
    </>
  );
};
