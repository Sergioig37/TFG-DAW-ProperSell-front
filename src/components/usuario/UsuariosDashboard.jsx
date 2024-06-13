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
  const idUser = useAuth().getId();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      } else {
        fetch(import.meta.env.VITE_LOCALHOST_URL + `usuario/usuarioExcluido/${idUser}`, {
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
  }, [token, rol, idUser, navigate]);

  const handleHabilitado = (id, enabled) => {
   

    fetch(import.meta.env.VITE_LOCALHOST_URL + `usuario/enabled/${id}/${enabled}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, habilitado: enabled } : usuario
        )
      );
    });
  };

  
  const handleVer = (id) => {
    navigate(`/usuario/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
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
                  <Button variant="info" onClick={() => handleVer(usuario.id)}>
                    Ver
                  </Button>
                </td>
                <td>
                  {usuario.habilitado ? (
                    <Button variant="danger" onClick={() => handleHabilitado(usuario.id, false)}>
                      Deshabilitar
                    </Button>
                  ) : (
                    <Button variant="success" onClick={() => handleHabilitado(usuario.id, true)}>
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
