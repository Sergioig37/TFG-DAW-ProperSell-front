import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { NavbarGeneral } from "../NavbarGeneral";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import env from "../../../env";

export const MisPropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const idUser = useAuth().getId();
  const user = useAuth().getUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(env.LOCALHOST_URL + `usuario/propiedades/${idUser}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPropiedades(data ? data : []);
        });
    }
  }, [token, idUser, navigate]);

  const handleEdit = (id) => {
    navigate(`/propiedad/edit/${id}`);
  };

  const handleDelete = (idPropiedad) => {

    setPropiedades(propiedades.filter((propiedad) => propiedad.id !== idPropiedad));

    fetch(env.LOCALHOST_URL + `propiedad/del/${idPropiedad}/${user}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <h4 className="mb-4">Mis Propiedades</h4>

        {propiedades.length > 0 && (
          <div className="mb-4 text-end">
            <Button
              variant="primary"
              onClick={() => navigate("/propiedad/create")}
            >
              <FaPlus className="me-2" />
              Añadir propiedad
            </Button>
          </div>
        )}

        {propiedades.length > 0 ? (
          <Row className="g-4">
            {propiedades.map((propiedad) => (
              <Col key={propiedad.id} xs={12} sm={6} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{propiedad.tipo}</Card.Title>
                    <Card.Text>{propiedad.localizacion}</Card.Text>
                    <Card.Text>{propiedad.precio}€</Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(propiedad.id)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(propiedad.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="mt-4">
            <Card.Body>
              <h5>No tienes propiedades</h5>
              <p>Intenta añadir algunas propiedades.</p>
              <Button
                variant="primary"
                onClick={() => navigate("/propiedad/create")}
              >
                <FaPlus className="me-2" />
                Añadir propiedad
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};
