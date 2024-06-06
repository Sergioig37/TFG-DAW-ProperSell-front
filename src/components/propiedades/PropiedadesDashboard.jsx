import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Container, Card } from "react-bootstrap";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

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
        fetch("http://localhost:9090/propiedad", {
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

  const handleDelete = (idPropiedad) => {
    var data = {
      id: idPropiedad,
    };

    fetch(`http://localhost:9090/propiedad/del/${data.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPropiedades(propiedades.filter((propiedad) => propiedad.id !== idPropiedad));
      })
      .catch((error) => {
        console.error("Error al eliminar la propiedad:", error);
      });
  };

  const handleVer = (id) => {
    navigate(`/propiedad/${id}`);
  };

  const handleDarDeBaja = (idPropiedad) => {
    var data = {
      id: idPropiedad,
    };

    fetch(`http://localhost:9090/propiedad/disable/${data.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPropiedades(
          propiedades.map((propiedad) =>
            propiedad.id === idPropiedad ? { ...propiedad, habilitado: false } : propiedad
          )
        );
      })
      .catch((error) => {
        console.error("Error al deshabilitar la propiedad:", error);
      });
  };

  const handleDarDeAlta = (idPropiedad) => {
    var data = {
      id: idPropiedad,
    };

    fetch(`http://localhost:9090/propiedad/enable/${data.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPropiedades(
          propiedades.map((propiedad) =>
            propiedad.id === idPropiedad ? { ...propiedad, habilitado: true } : propiedad
          )
        );
      })
      .catch((error) => {
        console.error("Error al habilitar la propiedad:", error);
      });
  };

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
                        <Button variant="danger" onClick={() => handleDarDeBaja(propiedad.id)}>
                          Deshabilitar
                        </Button>
                      ) : (
                        <Button variant="success" onClick={() => handleDarDeAlta(propiedad.id)}>
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
