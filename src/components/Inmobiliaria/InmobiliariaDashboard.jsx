import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export const InmobiliariaDashboard = () => {
  const [inmobiliarias, setInmobiliarias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9090/inmobiliaria")
      .then((res) => res.json())
      .then((data) => {
        setInmobiliarias(data);
      });
  });

  const handleEdit = (id) => {
    // Navega a la ruta de edición
    navigate(`/inmobiliaria/edit/${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación aquí
    console.log("Eliminar inmobiliaria", id);
  };

  return (
    <>
      <Button variant="contained" color="primary" href="/inmobiliaria/create">
        Crear Inmobiliaria
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Número de Empleados</TableCell>
              <TableCell align="right">Dirección</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inmobiliarias.map((inmobiliaria, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {inmobiliaria.id}
                </TableCell>
                <TableCell align="right">{inmobiliaria.nombre}</TableCell>
                <TableCell align="right">{inmobiliaria.numeroEmpleados}</TableCell>
                <TableCell align="right">{inmobiliaria.direccion}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(inmobiliaria.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(inmobiliaria.id)}>
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
