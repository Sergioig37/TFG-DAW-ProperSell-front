import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { NavbarGeneral } from "../NavbarGeneral";

export const ClientesDashboard = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9090/cliente")
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
  }, []);

  const handleEdit = (id) => {
    // Navega a la ruta de edición
    navigate(`/cliente/edit/${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación aquí
    console.log("Eliminar cliente", id);
  };

  const handleVer = (id) => {
    // Navega a la ruta de edición
    navigate(`/cliente/${id}`);
  };
  return (
    <>
    <NavbarGeneral/>
      <Button variant="contained" color="primary" href="/cliente/create">
        Crear Cliente
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Propiedades</TableCell>
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {cliente.id}
                </TableCell>
                <TableCell align="right">{cliente.nombre}</TableCell>
                <TableCell align="right">
                  <ul>
                    {cliente.propiedades.map((propiedad) => (
                      <li key={propiedad.id}>
                        {propiedad.tipo} - {propiedad.localizacion} - ${propiedad.precio}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleVer(cliente.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(cliente.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(cliente.id)}>
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
