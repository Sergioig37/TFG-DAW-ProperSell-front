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
import { Edit, Delete } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavbarGeneral } from "../NavbarGeneral";

export const PropiedadesDashboard = () => {
  const [propiedades, setPropiedades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9090/propiedad")
      .then((res) => res.json())
      .then((data) => {
        setPropiedades(data);
      });
  }, []);

  const handleEdit = (id) => {
    // Navega a la ruta de edición
    navigate(`/propiedad/edit/${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación aquí
    console.log("Eliminar propiedad", id);
  };

  const handleVer = (id) => {
    // Navega a la ruta de edición
    navigate(`/propiedad/${id}`);
  };

  return (
    <>
    <NavbarGeneral/>
      <Button variant="contained" color="primary" href="/propiedad/create">
        Crear Propiedad
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Localización</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propiedades.map((propiedad, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {propiedad.id}
                </TableCell>
                <TableCell align="right">{propiedad.tipo}</TableCell>
                <TableCell align="right">{propiedad.localizacion}</TableCell>
                <TableCell align="right">{propiedad.precio}</TableCell>
                <TableCell align="right">
                    <IconButton onClick={() => handleVer(propiedad.id)}>
                        <VisibilityIcon></VisibilityIcon>
                    </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(propiedad.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(propiedad.id)}>
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
