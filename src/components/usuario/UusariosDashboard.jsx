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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export const UsuariosDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();
  const user = useAuth().getUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (rol !== "ADMIN") {
        navigate("/denegado");
      } else {
        fetch(`http://localhost:9090/usuarioExcluido/${user}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUsuarios(data);
          });
      }
    }
  }, []);

  const handleDarDeBaja = (username) => {
    console.log("Eliminar usuario");
    var data = {
      username: username,
    };

    fetch(`http://localhost:9090/usuario/disable/${data.username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.username !== username)
      );
    });
    window.location.reload();
  };

  const handleDarDeAlta = (username) => {
    console.log("Eliminar usuario");
    var data = {
      username: username,
    };

    fetch(`http://localhost:9090/usuario/enable/${data.username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.username !== username)
      );
    });
    window.location.reload();
  };

  const handleVer = (username) => {
    navigate(`/usuario/${username}`);
  };

  return (
    <>
      <NavbarGeneral />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        href="/register"
      >
        Crear Usuario
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Correo</TableCell>
              <TableCell align="right">Nombre Real</TableCell>
              <TableCell align="right">Habilitado</TableCell>
              <TableCell align="right">Ver</TableCell>
              <TableCell align="right">Deshabilitar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell component="th" scope="row">
                  {usuario.id}
                </TableCell>
                <TableCell align="right">{usuario.username}</TableCell>
                <TableCell align="right">{usuario.correo}</TableCell>
                <TableCell align="right">{usuario.nombreReal}</TableCell>
                <TableCell align="right">
                  {usuario.habilitado === true ? "Si" : "No"}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleVer(usuario.username)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {usuario.habilitado == true ? (
                    <IconButton
                      onClick={() => handleDarDeBaja(usuario.username)}
                    >
                      <CloseIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleDarDeAlta(usuario.username)}
                    >
                      <CheckIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
