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
import { useAuth } from "../auth/AuthContext";

export const ClientesDashboard = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  
  useEffect(() => {
    if(!token){
      navigate("/login");
    }
    else{
      fetch("http://localhost:9090/cliente",{
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
    }
    
  }, []);

  const handleEdit = (id) => {
    // Navega a la ruta de edición
    navigate(`/cliente/edit/${id}`);
  };

  const handleDelete = (idCliente) => {
    // Implementa la lógica de eliminación aquí
    console.log("Eliminar cliente", idCliente);
    var data = {
      id: idCliente,
    }

    fetch(`http://localhost:9090/cliente/del/${data.id}`,{
      method: 'DELETE',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token
      },
    })
    window.location.reload();
    console.log("Eliminado Cliente", data.id);

  };

  const handleVer = (id) => {
    // Navega a la ruta de edición
    navigate(`/cliente/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Button
        variant="contained"
        color="primary"
        href="/cliente/create"
        sx={{ mt: 4 }}
      >
        Crear Cliente
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Correo</TableCell>
              <TableCell align="right">Teléfono</TableCell>
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell component="th" scope="row">
                  {cliente.id}
                </TableCell>
                <TableCell align="right">{cliente.nombre}</TableCell>
                <TableCell align="right">{cliente.correo}</TableCell>
                <TableCell align="right">{cliente.numeroTelefono}</TableCell>
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
