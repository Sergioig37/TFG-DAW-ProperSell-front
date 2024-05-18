import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { NavbarGeneral } from '../NavbarGeneral';

export const AgentesDashboard = () => {
  const [agentes, setAgentes] = useState([]);
  const navigate = useNavigate(); // Importa useNavigate para la navegación

  useEffect(() => {
    fetch("http://localhost:9090/agente")
      .then((res) => res.json())
      .then((data) => {
        setAgentes(data);
      });
  }, []);

  const handleEdit = (id) => {
    // Navega a la ruta de edición del agente con el ID proporcionado
    navigate(`/agente/edit/${id}`);
  };

  const handleDelete = (idAgente) => {
    // Implementa la lógica de eliminación aquí

    var data = {
      id: idAgente,
    }

    fetch(`http://localhost:9090/agente/del/${data.id}`,{
      method: 'DELETE',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    window.location.reload();
    console.log("Eliminado Agente", data.id);
  };

  const handleVer = (id) => {
    // Navega a la ruta de perfil del agente con el ID específico
    navigate(`/agente/${id}`);
  };
  
  return (
    <>
    <NavbarGeneral/>
      <Button variant="contained" color="primary" href="/inmobiliaria/create">
        Crear Agente
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Número de Teléfono</TableCell>
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentes.map((agente, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {agente.id}
                </TableCell>
                <TableCell align="right">{agente.nombre}</TableCell>
                <TableCell align="right">{agente.numeroTelefono}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleVer(agente.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(agente.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                   <IconButton onClick={() => handleDelete(agente.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
