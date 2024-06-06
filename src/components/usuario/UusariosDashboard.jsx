import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const UsuariosDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const user = useAuth().getUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      } else {
        fetch(`http://localhost:9090/usuarioExcluido/${user}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUsuarios(data);
          });
      }
    }
  }, [token, rol, user, navigate]);

  const handleDarDeBaja = (username) => {
    const enabled = false;

    fetch(`http://localhost:9090/usuario/enabled/${username}/${enabled}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.username === username ? { ...usuario, habilitado: false } : usuario
        )
      );
    });
  };

  const handleDarDeAlta = (username) => {
    const enabled = true;

    fetch(`http://localhost:9090/usuario/enabled/${username}/${enabled}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.username === username ? { ...usuario, habilitado: true } : usuario
        )
      );
    });
  };

  const handleVer = (username) => {
    navigate(`/usuario/${username}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-2">
          <Button variant="primary" href="/register">
            Crear Usuario
          </Button>
        </div>
        <h5>Usuarios Dashboard</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Correo</th>
              <th>Nombre Real</th>
              <th>Habilitado</th>
              <th>Ver</th>
              <th>Deshabilitar/Habilitar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.username}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.nombreReal}</td>
                <td>{usuario.habilitado ? "Si" : "No"}</td>
                <td>
                  <Button variant="info" onClick={() => handleVer(usuario.username)}>
                    Ver
                  </Button>
                </td>
                <td>
                  {usuario.habilitado ? (
                    <Button variant="danger" onClick={() => handleDarDeBaja(usuario.username)}>
                      Deshabilitar
                    </Button>
                  ) : (
                    <Button variant="success" onClick={() => handleDarDeAlta(usuario.username)}>
                      Habilitar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
