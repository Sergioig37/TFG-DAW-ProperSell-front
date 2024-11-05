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
import { FaSearch, FaTimes } from "react-icons/fa";
import styles from "./styles/explorar.module.css";

export const Explorar = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadesMostrar, setPropiedadesMostrar] = useState([]);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const navigate = useNavigate();
  const idUser = useAuth().getId();
  const token = useAuth().getToken();
  

  useEffect(() => {
   
      fetch(
        import.meta.env.VITE_LOCALHOST_URL +
          `propiedad/propiedadExcluida/${idUser}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data);
          setPropiedadesMostrar(data); // Inicializa propiedadesMostrar con todas las propiedades
        });
 
      fetch(import.meta.env.VITE_LOCALHOST_URL + `propiedad/habilitadas/1/10`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data);
          setPropiedadesMostrar(data); // Inicializa propiedadesMostrar con todas las propiedades
        });
 
  }, [token, idUser]);

  const handleVer = (id) => {
    if (token) {
      navigate(`/propiedad/${id}`);
    } else {
      navigate("/login");
    }
  };

  const filtrarPropiedades = () => {
    let filteredPropiedades = propiedades;

    // Filtrar por precio mínimo si está definido
    if (precioMin !== "") {
      filteredPropiedades = filteredPropiedades.filter(
        (propiedad) => propiedad.precio >= precioMin
      );
    }

    // Filtrar por precio máximo si está definido
    if (precioMax !== "") {
      filteredPropiedades = filteredPropiedades.filter(
        (propiedad) => propiedad.precio <= precioMax
      );
    }

    // Actualizar propiedadesMostrar con el resultado del filtro
    setPropiedadesMostrar(filteredPropiedades);

    // Actualizar precioMin y precioMax si los valores son diferentes de los actuales
    if (precioMin !== "") {
      setPrecioMin(precioMin);
    }
    if (precioMax !== "") {
      setPrecioMax(precioMax);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    filtrarPropiedades();
  };

  const handleBorrarFiltros = () => {
    setPrecioMin("");
    setPrecioMax("");
    setPropiedadesMostrar(propiedades);
  };

  return (
    <>
      <NavbarGeneral />
      <Container className={`mt-4 ${styles.container}`}>
        <h4 className={`mb-4 ${styles.h4}`}>Explorar Propiedades</h4>

        {token ? (
          <></>
        ) : (
          <h5 className={`mb-4 ${styles.h5}`}>
            Inicia sesión para ver más detalles
          </h5>
        )}

        <Form onSubmit={handleSearch} className="mb-4">
          <Row className="g-3">
            <Col xs={12} sm={6} md={3}>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Text className={styles["input-group-text"]}>
                    <FaSearch />
                  </InputGroup.Text>
                  <FormControl
                    type="number"
                    placeholder="Precio Mínimo"
                    value={precioMin}
                    onChange={(e) => setPrecioMin(e.target.value)}
                    min="0"
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Text className={styles["input-group-text"]}>
                    <FaSearch />
                  </InputGroup.Text>
                  <FormControl
                    type="number"
                    placeholder="Precio Máximo"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                    min="0"
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={3} className="d-flex align-items-center">
              <Button type="submit" variant="primary" className="w-100">
                <FaSearch className="me-2" />
                Filtrar
              </Button>
              <Button
                variant="secondary"
                onClick={handleBorrarFiltros}
                className="ms-2 w-100"
              >
                <FaTimes className="me-2" />
                Borrar Filtros
              </Button>
            </Col>
          </Row>
        </Form>

        {propiedadesMostrar.length >= 1 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {propiedadesMostrar.map((propiedad) => (
              <Col key={propiedad.id}>
                <Card className={`h-100 shadow-sm ${styles.card}`}>
                  <Card.Body className={styles["card-body"]}>
                    <Card.Title className={styles["card-title"]}>
                      {propiedad.tipo}
                    </Card.Title>
                    <Card.Text className={styles["card-text-muted"]}>
                      {propiedad.localizacion}
                    </Card.Text>
                    <Card.Text className={styles["card-text-primary"]}>
                      €{propiedad.precio}
                    </Card.Text>

                    {token && (
                      <Button
                        onClick={() => handleVer(propiedad.id)}
                        variant="outline-primary"
                      >
                        Ver propiedad
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center mt-4">
            <p className={styles["text-danger"]}>Sin resultados</p>
            <p className={styles["text-muted"]}>
              Intenta ajustar tus filtros de búsqueda.
            </p>
          </div>
        )}
      </Container>
    </>
  );
};
