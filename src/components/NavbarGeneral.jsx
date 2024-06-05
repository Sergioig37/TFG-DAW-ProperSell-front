import * as React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { MenuBoton } from "./MenuBoton";

export const NavbarGeneral = () => {
  const navigate = useNavigate();
  const { getToken, getRol } = useAuth();
  const token = getToken();
  const rol = getRol();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => handleNavigation("/")}>
          PropeSell
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <>
                <Nav.Link onClick={() => handleNavigation("/explore")}>
                  Explorar
                </Nav.Link>
                {rol === "ADMIN" ? (
                  <>
                    <Nav.Link onClick={() => handleNavigation("/")}>
                      Inicio
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigation("/admin")}>
                      Panel de Admin
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigation("/estadisticas")}>
                      Estadísticas
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link onClick={() => handleNavigation("/")}>
                      Inicio
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => handleNavigation("/mis-propiedades")}
                    >
                      Mis Propiedades
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigation("/mis-alertas")}>
                      Mis Alertas
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigation("/estadisticas")}>
                      Estadísticas
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!token ? (
              <>
                <Nav.Link onClick={() => handleNavigation("/login")}>
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigation("/register")}>
                  Registrarse
                </Nav.Link>
              </>
            ) : (
              <MenuBoton />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
