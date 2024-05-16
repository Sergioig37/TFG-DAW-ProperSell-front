import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Paper } from '@mui/material';

export const AdminPanel = () => {
  const [entidades, setEntidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Suponiendo que tienes un endpoint que devuelve todas las entidades
    fetch('http://localhost:9090/entidades')
      .then((res) => res.json())
      .then((data) => {
        setEntidades(data);
      });
  }, []);

  const handleVerMas = (id) => {
    // Navega al dashboard de la entidad específica
    navigate(`/dashboard/${id}`);
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Button variant="contained" color="primary" href="/entidad/create">
        Crear Nueva Entidad
      </Button>
      <List>
        {entidades.map((entidad, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={entidad.nombre} secondary={`ID: ${entidad.id}`} />
            <Button variant="outlined" onClick={() => handleVerMas(entidad.id)}>
              Ver Más
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
