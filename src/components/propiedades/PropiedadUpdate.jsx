import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const PropiedadUpdate = () => {
  const { id } = useParams();
  const [idPropiedad, setIdPropiedad] = useState(0);
  const [tipo, setTipo] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [precio, setPrecio] = useState("");
  const [propietario, setPropietario] = useState("");
  const token = useAuth().getToken();
  const navigate = useNavigate();
  const rol = useAuth().getRol();
  

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/propiedad/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTipo(data.tipo);
          setLocalizacion(data.localizacion);
          setPrecio(data.precio);
          setPropietario(data.propietario ? data.propietario.nombre : "");
          setIdPropiedad(data.id);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { tipo, localizacion, precio, propietario });
    var data = {
      id: idPropiedad,
      tipo: tipo,
      localizacion: localizacion,
      precio: precio,
    };

    fetch(`http://localhost:9090/propiedad/edit/${data.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        navigate(-1)
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
      });
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Localización"
                value={localizacion}
                onChange={(e) => setLocalizacion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
