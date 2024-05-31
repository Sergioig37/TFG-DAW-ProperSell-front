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

export const InmobiliariasDashboard = () => {
  const [inmobiliarias, setInmobiliarias] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      } else {
        fetch("http://localhost:9090/inmobiliaria", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setInmobiliarias(data);
          })
          .catch((error) => {
            console.error("Error al obtener las inmobiliarias:", error);
          });
      }
    }
  }, []); // Lista de dependencias vacía
  

  const handleEdit = (id) => {
    // Navega a la ruta de edición
    navigate(`/inmobiliaria/edit/${id}`);
  };

  const handleDelete = (idInmobiliaria) => {
    // Implementa la lógica de eliminación aquí
    console.log("Eliminar inmobiliaria", idInmobiliaria);
    var data = {
      id: idInmobiliaria,
    };

    fetch(`http://localhost:9090/inmobiliaria/del/${data.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    window.location.reload();
    console.log("Eliminado Inmobiliaria", data.id);
  };

  const handleVer = (id) => {
    // Navega a la ruta de edición
    navigate(`/inmobiliaria/${id}`);
  };
  return (
    <>
      <NavbarGeneral />
      <Button
        variant="contained"
        color="primary"
        href="/inmobiliaria/create"
        sx={{ mt: 4 }}
      >
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
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inmobiliarias.map((inmobiliaria, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {inmobiliaria.id}
                </TableCell>
                <TableCell align="right">{inmobiliaria.nombre}</TableCell>
                <TableCell align="right">
                  {inmobiliaria.numeroEmpleados}
                </TableCell>
                <TableCell align="right">{inmobiliaria.direccion}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleVer(inmobiliaria.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(inmobiliaria.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
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
