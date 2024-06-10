import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Container, Row, Col, Card } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const AlertasDashboard = () => {
  const [alertas, setAlertas] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      } else {
        fetch("http://localhost:9090/alerta", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setAlertas(data ? data : []);
          });
      }
    }
  }, [token, rol, navigate]);

  const handleEdit = (id) => {
    navigate(`/alerta/edit/${id}`);
  };

  const handleDelete = (idAlerta) => {
    fetch(`http://localhost:9090/alerta/del/${idAlerta}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        // Actualizar el estado después de la eliminación
        setAlertas(alertas.filter((alerta) => alerta.id !== idAlerta));
      })
      .catch((error) => {
        console.error("Error al eliminar la alerta:", error);
      });
  };


  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <Row className="justify-content-end mb-3">
          <Col md={2}>
            <Button variant="primary" href="/alerta/create" className="w-100">
              Crear Alerta
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Editar</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alertas.map((alerta) => (
                      <tr key={alerta.id}>
                        <td>{alerta.id}</td>
                        <td>{alerta.nombre}</td>
                        <td>{alerta.descripcion}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(alerta.id)}
                          >
                            Editar
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(alerta.id)}
                          >
                            Borrar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
