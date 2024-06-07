import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const AlertaUpdate = () => {
  const { id } = useParams();
  const [idAlerta, setIdAlerta] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errors, setErrors] = useState({}); // State to manage errors
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
            setDescripcion(data.descripcion);
            setIdAlerta(data.id);
          });
      } else {
        navigate("/denegado");
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation check for empty fields
    if (!nombre.trim() || !descripcion.trim()) {
      setErrors({ message: "Por favor, complete todos los campos." });
      return;
    }

    var data = {
      id: idAlerta,
      nombre: nombre,
      descripcion: descripcion,
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

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Error message */}
            {errors.message && (
              <Grid item xs={12}>
                <div style={{ color: "red" }}>{errors.message}</div>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                error={errors.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                error={errors.descripcion}
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
