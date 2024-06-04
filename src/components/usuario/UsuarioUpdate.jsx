import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container, IconButton, InputAdornment } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const UsuarioUpdate = () => {
  const { username } = useParams();
  const [correo, setCorreo] = useState("");
  const [nombreReal, setNombreReal] = useState("");
  const [usernameEdit, setUsernameEdit] = useState("");
  const [password, setPassword] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const token = useAuth().getToken();
  const passwrd = useAuth().getAuthPassword();
  const user = useAuth().getUser();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/${username}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsernameEdit(data.username);
          setCorreo(data.correo);
          setNombreReal(data.nombreReal);
          setNumeroTelefono(data.numeroTelefono);
          setPassword(passwrd);
          // Password shouldn't be set from server for security reasons
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [username, token, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameEdit,
      correo: correo,
      nombreReal: nombreReal,
      numeroTelefono: numeroTelefono,
      password: password, // Ensure to hash password before sending to the server
    };

    fetch(`http://localhost:9090/usuario/edit/${username}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.token) {
          setToken(res.token);
        }
        navigate(-1, {replace: true})
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre Real"
              value={nombreReal}
              onChange={(e) => setNombreReal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de Usuario"
              value={usernameEdit}
              onChange={(e) => setUsernameEdit(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número de teléfono"
              value={numeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Grid>
          {
            user===username?(
               <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
            ):(
              <></>
            )
          }
         
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
