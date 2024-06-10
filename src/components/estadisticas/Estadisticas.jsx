import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Estadisticas = () => {
  const [propiedadesMasCaras, setPropiedadesMasCaras] = useState([]);
  const [usuariosConXAlertas, setUsuariosConXAlertas] = useState([]);
  const [usuariosConMasDeUnaPropiedad, setUsuariosConMasDeUnaPropiedad] = useState([]);
  const [alertasPopulares, setAlertasPopulares] = useState([]);
  const [usuariosBaneados, setUsuariosBaneados] = useState([]);
  const [alertasLargas, setAlertasLargas] = useState([]);
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
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res?res.json():[])
      .then((data) => {
        setPropiedadesMasCaras(data?data:[]);
      });
  };

  const handleVerUsuariosConXAlertas = () => {
    fetch(
      `http://localhost:9090/estadisticas/usuarioConMasDe/${numeroAlertas}/alertas`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) =>res?res.json():[])
      .then((data) => {
        setUsuariosConXAlertas(data?data:[]);
      });
  };

  useEffect(() => {
    if (!token || rol !== "ADMIN") {
      navigate("/denegado");
    }

    fetch("http://localhost:9090/estadisticas/usuario/variasPropiedades", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res?res.json():[])
      .then((data) => {
        setUsuariosConMasDeUnaPropiedad(data?data:[]);
      });

    fetch("http://localhost:9090/estadisticas/alertas/variosUsuarios", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res?res.json():[])
      .then((data) => {
        setAlertasPopulares(data?data:[]);
      });

    fetch("http://localhost:9090/estadisticas/usuarios/baneados", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res?res.json():[])
      .then((data) => {
        setUsuariosBaneados(data?data:[]);
      });
  }, []);

  const handleVerAlertasLargas = () => {
    fetch(`http://localhost:9090/estadisticas/alertas/${tamanoDescripcion}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res?res.json():[])
      .then((data) => {
        setAlertasLargas(data?data:[]);
      });
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <h4 className="mb-4 text-primary">Estadísticas</h4>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-info">Propiedades que cuestan más de {precioPropiedad} euros:</h5>
            <Form>
              <Row className="align-items-center">
                <Col xs={3}>
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
                <Col xs={2}>
                  <Button variant="info" onClick={handleVerPropiedadesMasCaras}>
                    Ver
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="mt-3">
              <p>Cantidad: {propiedadesMasCaras.length}</p>
              {propiedadesMasCaras.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {propiedadesMasCaras.map((propiedad) => (
                    <Col key={propiedad.id}>
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Card.Title>{propiedad.tipo}</Card.Title>
                          <Card.Text>Localización: {propiedad.localizacion}</Card.Text>
                          <Card.Text>Precio: €{propiedad.precio}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
              <></>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-success">Usuarios con más de {numeroAlertas} alertas:</h5>
            <Form>
              <Row className="align-items-center">
                <Col xs={3}>
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
                <Col xs={2}>
                  <Button variant="success" onClick={handleVerUsuariosConXAlertas}>
                    Ver
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="mt-3">
            <p>Cantidad: {usuariosConXAlertas.length}</p>
              {usuariosConXAlertas.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {usuariosConXAlertas.map((usuario) => (
                    <Col key={usuario.id}>
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Card.Title>{usuario.username}</Card.Title>
                          <Card.Text>Alertas: {usuario.alertas.length}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <></>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-warning">Usuarios con más de una propiedad:</h5>
            <div className="mt-3">
            <p>Cantidad: {usuariosConMasDeUnaPropiedad.length}</p>
              {usuariosConMasDeUnaPropiedad.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {usuariosConMasDeUnaPropiedad.map((usuario) => (
                    <Col key={usuario.id}>
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Card.Title>{usuario.username}</Card.Title>
                          <Card.Text>Propiedades: {usuario.propiedades.length}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <></>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            
            <h5 className="text-danger">Alertas con más de una suscripción:</h5>
            <div className="mt-3">
            <p>Cantidad: {alertasPopulares.length}</p>
              {alertasPopulares.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {alertasPopulares.map((alerta) => (
                    <Col key={alerta.id}>
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Card.Title>{alerta.nombre}</Card.Title>
                          <Card.Text>Suscripciones: {alerta.numeroUsuarios}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <></>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-secondary">Usuarios bloqueados:</h5>
            <div className="mt-3">
            <p>Cantidad: {usuariosBaneados.length}</p>
              {usuariosBaneados.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {usuariosBaneados.map((usuario) => (
                    <Col key={usuario.id}>
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Card.Title>{usuario.username}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <></>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm bg-light">
          <Card.Body>
            <h5 className="text-primary">Alertas con descripción de más de {tamanoDescripcion} de caracteres:</h5>
            <Form>
              <Row className="align-items-center">
                <Col xs={3}>
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
                <Col xs={2}>
                  <Button variant="primary" onClick={handleVerAlertasLargas}>
                    Ver
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="mt-3">
            <p>Cantidad: {alertasLargas.length}</p>
              {alertasLargas.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {alertasLargas.map((alerta) => (
                    <Col key={alerta.id}>
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <Card.Title>{alerta.nombre}</Card.Title>
                          <Card.Text>Descripción: {alerta.descripcion}</Card.Text>
                          <Card.Text>Tamaño: {alerta.descripcion.length}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <></>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
