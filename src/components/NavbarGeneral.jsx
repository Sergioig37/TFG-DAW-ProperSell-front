import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { MenuBoton } from "./MenuBoton";

export const NavbarGeneral = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const rol = useAuth().getRol();

  const handleExplorar = () => {
    navigate("/explore");
  };

  const handleLanding = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div">
              <Button variant="h6" component="div" onClick={handleLanding}>
                ProperSell
              </Button>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {token && rol === "ADMIN" ? (
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Button variant="h6" component="div" onClick={handleExplorar}>
                    Explorar{" "}
                  </Button>
                  <Button
                    variant="h6"
                    component="div"
                    onClick={() => navigate("/admin")}
                  >
                    Panel de admin
                  </Button>
                </Typography>
              ) : token && rol !== "ADMIN" ? (
                <Button variant="h6" component="div" onClick={handleExplorar}>
                  Explorar{" "}
                </Button>
              ) : (
                <></>
              )}
            </Typography>
            {!token ? (
              <Typography variant="h6" component="div" f>
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleRegister}>
                  Register
                </Button>
              </Typography>
            ) : (
              <MenuBoton />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
