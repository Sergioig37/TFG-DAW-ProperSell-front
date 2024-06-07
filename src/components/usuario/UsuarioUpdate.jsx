import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  IconButton,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const UsuarioUpdate = () => {
  const [correo, setCorreo] = useState("");
  const [nombreReal, setNombreReal] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const token = useAuth().getToken();
  const passwrd = useAuth().getAuthPassword();
  const idUser = useAuth().getId();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetch(`http://localhost:9090/usuario/${idUser}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
      
          setCorreo(data.correo);
          setNombreReal(data.nombreReal);
          setNumeroTelefono(data.numeroTelefono ? data.numeroTelefono : "");
          setPassword(passwrd);
          setUsername(data.username);
          // Password shouldn't be set from server for security reasons
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [idUser, token, navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        username: username,
        correo: correo,
        nombreReal: nombreReal,
        numeroTelefono: numeroTelefono,
        password: password, // Ensure to hash password before sending to the server
      };

      fetch(`http://localhost:9090/usuario/edit/${idUser}`, {
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
          navigate(-1, { replace: true });
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!nombreReal.trim()) {
      formIsValid = false;
      errors["nombreReal"] = "Ingrese su nombre real";
    }

    if (!correo.trim()) {
      formIsValid = false;
      errors["correo"] = "Ingrese su correo electrónico";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      formIsValid = false;
      errors["correo"] = "Ingrese un correo electrónico válido";
    }

    if (!numeroTelefono.trim()) {
      formIsValid = false;
      errors["numeroTelefono"] = "Ingrese su número de teléfono";
    } else if (!/^\d+$/.test(numeroTelefono)) {
      formIsValid = false;
      errors["numeroTelefono"] =
        "El número de teléfono debe contener solo números";
    } else if (numeroTelefono.trim().length !== 9) {
      formIsValid = false;
      errors["numeroTelefono"] = "El número de teléfono debe tener 10 dígitos";
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth error={errors["nombreReal"]}>
              <TextField
                fullWidth
                label="Nombre Real"
                value={nombreReal}
                onChange={(e) => setNombreReal(e.target.value)}
              />
              <FormHelperText>{errors["nombreReal"]}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={errors["numeroTelefono"]}>
              <TextField
                fullWidth
                label="Número de teléfono"
                value={numeroTelefono}
                onChange={(e) => setNumeroTelefono(e.target.value)}
              />
              <FormHelperText>{errors["numeroTelefono"]}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={errors["correo"]}>
              <TextField
                fullWidth
                label="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <FormHelperText>{errors["correo"]}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
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
            </FormControl>
          </Grid>

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
