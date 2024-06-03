import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  useStepContext,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const AlertaUpdate = () => {
  const { id } = useParams();
  const [idAlerta, setIdAlerta] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol === "ADMIN") {
        fetch(`http://localhost:9090/alerta/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setNombre(data.nombre);
            setDescripcion(data.descripcion)
            setIdAlerta(data.id);
          });
      }
      else{
        navigate("/denegado");
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      id: idAlerta,
      nombre: nombre,
      descripcion: descripcion
    };

    fetch(`http://localhost:9090/alerta/edit/${data.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    navigate(-1);
  };
  0;

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
