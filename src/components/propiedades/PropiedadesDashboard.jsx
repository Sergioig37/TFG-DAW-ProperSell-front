import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Container, Card } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";
import env from "../../../env";

export const PropiedadesDashboard = () => {
  const [propiedades, setPropiedades] = useState([]);
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
        fetch(import.meta.env.VITE_LOCALHOST_URL + "propiedad", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setPropiedades(data);
          });
      }
    }
  }, []);

  const handleVer = (id) => {
    navigate(`/propiedad/${id}`);
  };


  const handleHabilitado = (id, enabled) => {
   
    console.log(enabled)

    fetch(import.meta.env.VITE_LOCALHOST_URL + `propiedad/enabled/${id}/${enabled}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setPropiedades((prevPropiedades) =>
        prevPropiedades.map((propiedad) =>
          propiedad.id === id ? { ...propiedad, habilitado: enabled } : propiedad
        )
      );
    });
  }

  return (
    <>
      <NavbarGeneral />
      <Container className="mt-4">
      
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Localización</th>
                  <th>Precio</th>
                  <th>Ver</th>
                  <th>Habilitado</th>
                  <th>Deshabilitar/Habilitar</th>
                </tr>
              </thead>
              <tbody>
                {propiedades.map((propiedad) => (
                  <tr key={propiedad.id}>
                    <td>{propiedad.id}</td>
                    <td>{propiedad.tipo}</td>
                    <td>{propiedad.localizacion}</td>
                    <td>{propiedad.precio}</td>
                    <td>
                      <Button variant="info" onClick={() => handleVer(propiedad.id)}>
                        Ver
                      </Button>
                    </td>
                    <td>{propiedad.habilitado ? "Si" : "No"}</td>
                    <td>
                      {propiedad.habilitado ? (
                        <Button variant="danger" onClick={() => handleHabilitado(propiedad.id, false)}>
                          Deshabilitar
                        </Button>
                      ) : (
                        <Button variant="success" onClick={() => handleHabilitado(propiedad.id, true)}>
                          Habilitar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
