import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const ClienteUpdate = () => {
  const { id } = useParams();
  const [idCliente, setIdCliente] = useState(0);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const token = useAuth().getToken();

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate("/login");
    }
    else{
      fetch(`http://localhost:9090/cliente/${id}`,{
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre);
        setCorreo(data.correo);
        setNumeroTelefono(data.numeroTelefono);
        setIdCliente(data.id);
      });
    }
    
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { nombre, correo, numeroTelefono });
    var data = {
      id: idCliente,
      nombre: nombre,
      correo: correo,
      numeroTelefono: numeroTelefono,
    };

    fetch(`http://localhost:9090/cliente/edit/${data.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
        
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        navigate(-1, {replace: true})
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
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Teléfono"
                value={numeroTelefono}
                onChange={(e) => setNumeroTelefono(e.target.value)}
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
