import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const AlertaCreate = () => {
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
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
        descripcion: descripcion,
        nombre: nombre
      };
    
      fetch(`http://localhost:9090/alerta/save`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
      })
     navigate(-1);
      
      
  };


  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de la alerta"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripcion de la alerta"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
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
