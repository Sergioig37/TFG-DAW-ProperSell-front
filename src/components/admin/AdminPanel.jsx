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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#3f51b5",
          }}
        >
          Panel de Control
        </Typography>
        <List>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
              "&:hover": {
                backgroundColor: "#bbdefb",
              },
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ListItemText primary="Alertas" />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAlertaRoute}
              sx={{
                textTransform: "none",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
              "&:hover": {
                backgroundColor: "#bbdefb",
              },
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ListItemText primary="Propiedades" />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePropiedades}
              sx={{
                textTransform: "none",
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              Ver Dashboard
            </Button>
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
              "&:hover": {
                backgroundColor: "#bbdefb",
              },
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ListItemText primary="Usuarios" />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUsuarios}
              sx={{
                textTransform: "none",
                backgroundColor: "#ff9800",
                "&:hover": {
                  backgroundColor: "#f57c00",
                },
              }}
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
