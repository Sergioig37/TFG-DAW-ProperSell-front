import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Visibility, Margin } from "@mui/icons-material";
import { NavbarGeneral } from "../NavbarGeneral";
import { useAuth } from "../auth/AuthContext";

export const AlertasDashboard = () => {
  const [alertas, setAlertas] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken(); 
  const rol = useAuth().getRol()
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol != "ADMIN") {
        navigate("/denegado");
      } else {
        fetch("http://localhost:9090/alerta", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setAlertas(data);
          });
      }
    }
  }, []);

  const handleEdit = (id) => {
    // Navega a la ruta de edición del agente con el ID proporcionado
    navigate(`/alerta/edit/${id}`);
  };

  const handleDelete = (idAlerta) => {
    // Implementa la lógica de eliminación aquí

    var data = {
      id: idAlerta,
    };

    fetch(`http://localhost:9090/alerta/del/${data.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    window.location.reload();
    
  };

  const handleVer = (id) => {
    // Navega a la ruta de perfil del agente con el ID específico
    navigate(`/alerta/${id}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Button
        variant="contained"
        color="primary"
        href="/alerta/create"
        sx={{ mt: 4 }}
      >
        Crear Alerta
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Descripcion</TableCell>
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alertas.map((alerta, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {alerta.id}
                </TableCell>
                <TableCell align="right">{alerta.nombre}</TableCell>
                <TableCell align="right">{alerta.descripcion}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleVer(alerta.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(alerta.id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(alerta.id)}>
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
