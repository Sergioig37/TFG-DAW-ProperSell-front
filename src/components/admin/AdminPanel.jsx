import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Paper, Container, Typography } from "@mui/material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();


  const handleAlertaRoute = () => {
    navigate("/admin/alerta-dashboard");
  };

  const handlePropiedades = () => {
    navigate("/admin/propiedades-dashboard");
  };

  const handleUsuarios = () => {
    navigate("/admin/usuarios-dashboard");
  };

  useEffect(() => {

    if(!token){
      navigate("/login");
    }
    else{
      if(rol!="ADMIN"){
        navigate("/denegado");
      }
    }
  }, [])
  
  
  return (
    <>
    <NavbarGeneral />
    <Container maxWidth="md" className="container">
      <Paper elevation={3} className="control-panel-paper">
        <Typography variant="h5" gutterBottom className="control-panel-title">
          Panel de Control
        </Typography>
        <List>
          <ListItem className="list-item">
            <ListItemText primary="Alertas" />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAlertaRoute}
              className="button-alertas"
            >
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem className="list-item">
            <ListItemText primary="Propiedades" />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePropiedades}
              className="button-propiedades"
            >
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem className="list-item">
            <ListItemText primary="Usuarios" />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUsuarios}
              className="button-usuarios"
            >
              Ver Dashboard
            </Button>
          </ListItem>
        </List>
      </Paper>
    </Container>
  </>
  );
};
