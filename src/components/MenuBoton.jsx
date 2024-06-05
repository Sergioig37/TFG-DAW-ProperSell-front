import * as React from "react";
import { Button, Menu, MenuItem, Avatar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export const MenuBoton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const user = useAuth().getUser();
  const rol = useAuth().getRol();
  const { clearToken } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  const handleVerPerfil = () => {
    navigate("/account");
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" sx={{ marginRight: 2, color: "#fff" }}> {/* Cambio del color del texto a blanco */}
          {user} ({rol})
        </Typography>
        <Button
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Avatar sx={{ marginRight: 1 }}>
            <AccountCircleIcon />
          </Avatar>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleVerPerfil}>
            <AccountCircleIcon sx={{ marginRight: 1 }} />
            Mi cuenta
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ marginRight: 1 }} />
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};
