import * as React from "react";
import { Button, Menu, MenuItem, Avatar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export const MenuBoton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const user = useAuth().getUser();
  const rol = useAuth().getRol();
  const {clearToken} = useAuth();
  

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
      <Typography variant="h6" sx={{ marginRight: 2 }}>
        {user} ({rol})
      </Typography>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Avatar sx={{ marginRight: 1 }} />
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
        <MenuItem onClick={handleVerPerfil}>Mi cuenta</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    </Box>
    </div>
  );
};
