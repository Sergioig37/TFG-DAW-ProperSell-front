import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Paper,
  Divider,
  Button,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const AlertaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alerta, setAgente] = useState({});
  const token = useAuth().getToken();
  const rol = useAuth().getRol();

  useEffect(() => {
    window.location.reload
    if (!token) {
      navigate("/login");
      
    }
    if(rol!=="ADMIN"){
      navigate("/denegado")
    }
    fetch(`http://localhost:9090/alerta/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAgente(data);
      });
  }, [id, token, navigate]);

  const handleEdit = () => {
    navigate(`/alerta/edit/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 4, 
          textAlign: 'center',
          backgroundColor: '#f5f5f5', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {alerta.nombre}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {alerta.descripcion}
          </Typography>
          <Divider sx={{ my: 3, width: '80%' }} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={handleEdit}
            sx={{ mt: 2 }}
          >
            Editar Alerta
          </Button>
        </Box>
      </Paper>
    </Container>
    </>
  );
};
