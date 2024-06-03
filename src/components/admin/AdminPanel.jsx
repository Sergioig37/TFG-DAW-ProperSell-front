import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Paper } from "@mui/material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();


  const handleClienteRoute = () => {
    navigate("/admin/clientes-dashboard");
  };

  const handleAgenteRoute = () => {
    navigate("/admin/agentes-dashboard");
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
      <Paper style={{ margin: 16, padding: 16 }}>
        <List>
          <ListItem divider>
            <ListItemText primary="Clientes" />

            <Button variant="outlined" onClick={handleClienteRoute}>
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Agentes Inmobiliarios" />

            <Button variant="outlined" onClick={handleAgenteRoute}>
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem>
          <ListItemText primary="Propiedades" />
            <Button variant="outlined" onClick={handlePropiedades}>
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem>
          <ListItemText primary="Usuarios" />
            <Button variant="outlined" onClick={handleUsuarios}>
              Ver Dashboard
            </Button>
          </ListItem>
        </List>
      </Paper>
    </>
  );
};
