import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Paper } from "@mui/material";
import { NavbarGeneral } from "../NavbarGeneral";

export const AdminPanel = () => {
  const navigate = useNavigate();

  const handleClienteRoute = () => {
    navigate("/admin/clientes-dashboard");
  };

  const handleAgenteRoute = () => {
    navigate("/admin/agentes-dashboard");
  };

  const handleInmobiliarias = () => {
    navigate("/admin/inmobiliarias-dashboard");
  };

  const handlePropiedades = () => {
    navigate("/admin/propiedades-dashboard");
  };
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
            <ListItemText primary="Inmobiliarias" />

            <Button variant="outlined" onClick={handleInmobiliarias}>
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem>
          <ListItemText primary="Propiedades" />
            <Button variant="outlined" onClick={handlePropiedades}>
              Ver Dashboard
            </Button>
          </ListItem>
        </List>
      </Paper>
    </>
  );
};
