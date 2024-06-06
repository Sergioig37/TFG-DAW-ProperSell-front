import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container, FormControl, FormHelperText } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const PropiedadCreate = () => {
  const [tipo, setTipo] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [precio, setPrecio] = useState("");
  const [errors, setErrors] = useState({});
  const token = useAuth().getToken();
  const idUser = useAuth().getId();
  const rol = useAuth().getRol();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else{
      if(rol ==="ADMIN"){
        navigate("/denegado");
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos enviados:", { tipo, localizacion, precio });
      var data = {
        tipo: tipo,
        localizacion: localizacion,
        precio: precio,
        propietario: idUser,
        habilitado: true
      };

      fetch('http://localhost:9090/propiedad/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error al enviar los datos:", error);
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!tipo.trim()) {
      formIsValid = false;
      errors["tipo"] = "Ingrese el tipo de propiedad";
    }

    if (!localizacion.trim()) {
      formIsValid = false;
      errors["localizacion"] = "Ingrese la localización de la propiedad";
    }

    if (!precio.trim()) {
      formIsValid = false;
      errors["precio"] = "Ingrese el precio de la propiedad";
    } else if (!/^\d+$/.test(precio)) {
      formIsValid = false;
      errors["precio"] = "El precio debe contener solo números";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth error={errors["tipo"]}>
                <TextField
                  fullWidth
                  label="Tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <FormHelperText>{errors["tipo"]}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={errors["localizacion"]}>
                <TextField
                  fullWidth
                  label="Localización"
                  value={localizacion}
                  onChange={(e) => setLocalizacion(e.target.value)}
                />
                <FormHelperText>{errors["localizacion"]}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={errors["precio"]}>
                <TextField
                  fullWidth
                  label="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
                <FormHelperText>{errors["precio"]}</FormHelperText>
              </FormControl>
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
