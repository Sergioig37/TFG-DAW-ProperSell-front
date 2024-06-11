import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faqs, itemData } from "./data/Data";
import { NavbarGeneral } from "./NavbarGeneral";
import { useAuth } from "./auth/AuthContext";
import env from "../../env";
import { Footer } from "./Footer";

export const LandingPage = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const username = useAuth().getUser();
  const { setId } = useAuth();

  const handleHome = () => {
    navigate("/explore");
  };

  useEffect(() => {
    if (token) {
      fetch(import.meta.env.VITE_LOCALHOST_URL + `usuario/usuarioNombre/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((respuesta) => respuesta.json())
        .then((data) => {
          console.log(data.id);
          setId(data.id);
        });
    }
  }, [token, username, setId]);

  return (
    <>
      <NavbarGeneral />
      <Container>
        <Row className="mt-4 text-center">
          <Col>
            <h4>¡Bienvenido a ProperSell!</h4>
            <p>
              Somos una empresa dedicada a ayudarte a encontrar la casa de tus
              sueños.
            </p>
          </Col>
        </Row>
        <Row className="text-center my-4">
          <Col>
            <Button variant="primary" size="lg" onClick={handleHome}>
              Ver propiedades
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Encuentra tu Hogar</Card.Title>
                <Card.Text className="text-center">
                  Explora una amplia gama de propiedades e inmobiliarias
                  dispuestas a ayudarte a encontrar un hogar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Vende tu Propiedad</Card.Title>
                <Card.Text className="text-center">
                  Benefíciate de nuestra experiencia y red de contactos para
                  vender tu propiedad rápidamente.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h5 className="text-center">Galería de Imágenes</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {itemData.map((item) => (
                <div key={item.img} className="m-2 image-container">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid image-item"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h5 className="text-center">Preguntas Frecuentes</h5>
            <Accordion>
              {faqs.map((faq, index) => (
                <Accordion.Item eventKey={index.toString()} key={faq.question}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>{faq.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>

      <style>{`
        .image-container {
          width: 300px;
          height: 300px;
          overflow: hidden;
        }
        .image-item {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
       <Footer/>
    </>
  );
};
