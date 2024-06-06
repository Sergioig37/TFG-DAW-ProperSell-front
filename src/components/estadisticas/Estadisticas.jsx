import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Estadisticas = () => {
  const [propiedadesMasCaras, setPropiedadesMasCaras] = useState(null);
  const [usuariosConXAlertas, setUsuariosConXAlertas] = useState(null);
  const [usuariosConMasDeUnaPropiedad, setUsuariosConMasDeUnaPropiedad] = useState(null);
  const [alertasPopulares, setAlertasPopulares] = useState(null);
  const [usuariosBaneados, setUsuariosBaneados] = useState(null);
  const [alertasLargas, setAlertasLargas] = useState(null);
  const [numeroAlertas, setNumeroAlertas] = useState(0);
  const [precioPropiedad, setPrecioPropiedad] = useState(0);
  const [tamanoDescripcion, setTamanoDescripcion] = useState(0);
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const navigate = useNavigate();

  const handleVerPropiedadesMasCaras = () => {
    fetch(
      `http://localhost:9090/estadisticas/propiedadMasCarasDe/${precioPropiedad}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPropiedadesMasCaras(data.length);
      });
  };

  const handleVerUsuariosConXAlertas = () => {
    fetch(
      `http://localhost:9090/estadisticas/usuarioConMasDe/${numeroAlertas}/alertas`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUsuariosConXAlertas(data.length);
      });
  };

  useEffect(() => {
    if (!token || rol !== "ADMIN") {
      navigate("/denegado");
    }

    fetch("http://localhost:9090/estadisticas/usuario/variasPropiedades", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuariosConMasDeUnaPropiedad(data.length);
      });

    fetch("http://localhost:9090/estadisticas/alertas/variosUsuarios", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAlertasPopulares(data.length);
      });

    fetch("http://localhost:9090/estadisticas/usuarios/baneados", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuariosBaneados(data.length);
      });
  }, []);

  const handleVerAlertasLargas = () => {
    fetch(`http://localhost:9090/estadisticas/alertas/${tamanoDescripcion}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAlertasLargas(data.length);
      });
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <h4 className="mb-4 text-primary">Estadísticas</h4>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-info">Número de propiedades que cuestan más de {precioPropiedad} euros:</h5>
            <Form>
              <Row className="align-items-center">
                <Col xs={1}>
                  <Form.Group controlId="precioPropiedad">
                    <Form.Control
                      type="number"
                      placeholder="Precio"
                      value={precioPropiedad}
                      onChange={(e) => setPrecioPropiedad(e.target.value)}
                      className="border-info form-control-sm"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Button variant="info" onClick={handleVerPropiedadesMasCaras}>
                    Ver
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="mt-3">
              <strong>Cantidad:</strong> {propiedadesMasCaras}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-success">Usuarios con más de {numeroAlertas} alertas:</h5>
            <Form>
              <Row className="align-items-center">
                <Col xs={1}>
                  <Form.Group controlId="numeroAlertas">
                    <Form.Control
                      type="number"
                      placeholder="Número de Alertas"
                      value={numeroAlertas}
                      onChange={(e) => setNumeroAlertas(e.target.value)}
                      className="border-success form-control-sm"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Button variant="success" onClick={handleVerUsuariosConXAlertas}>
                    Ver
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="mt-3">
              <strong>Cantidad:</strong> {usuariosConXAlertas}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-warning">Usuarios con más de una propiedad:</h5>
            <div className="mt-3">
              <strong>Cantidad:</strong> {usuariosConMasDeUnaPropiedad}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-danger">Alertas con más de una suscripción:</h5>
            <div className="mt-3">
              <strong>Cantidad:</strong> {alertasPopulares}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-secondary">Usuarios bloqueados:</h5>
            <div className="mt-3">
              <strong>Cantidad:</strong> {usuariosBaneados}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-primary">Alertas con más de {tamanoDescripcion} número de caracteres:</h5>
            <Form>
              <Row className="align-items-center">
                <Col xs={1}>
                  <Form.Group controlId="tamanoDescripcion">
                    <Form.Control
                      type="number"
                      placeholder="Tamaño de Descripción"
                      value={tamanoDescripcion}
                      onChange={(e) => setTamanoDescripcion(e.target.value)}
                      className="border-primary form-control-sm"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Button variant="primary" onClick={handleVerAlertasLargas}>
                    Ver
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="mt-3">
              <strong>Cantidad:</strong> {alertasLargas}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
