import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; ProperSell 2024. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
