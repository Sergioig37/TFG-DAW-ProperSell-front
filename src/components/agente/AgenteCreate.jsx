import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const AgenteCreate = () => {
  const {id} = useParams();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [inmobiliaria, setInmobiliaria] = useState(id?id:"");
  const token = useAuth().getToken();

    const navigate = useNavigate();

     useEffect(() => {
    if(!token){
      navigate("/login");
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
        nombre: nombre,
        correo: correo,
        numeroTelefono: numeroTelefono,
        inmobiliaria: inmobiliaria
      };
    
      fetch(`http://localhost:9090/agente/save`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
      })
      navigate(-1, {replace: true})
      
      
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
            </Grid> <Grid item xs={12}>
              <TextField
                fullWidth
                label="Inmobiliaria"
                value={inmobiliaria}
                onChange={(e) => setInmobiliaria(e.target.value)}
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
