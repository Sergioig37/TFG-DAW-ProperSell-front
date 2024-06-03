import * as React from "react";
import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export const MenuBoton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const user = useAuth().getUser();
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
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar  alt={user?.name}>
          
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
        <MenuItem >{user}</MenuItem>
        <MenuItem onClick={handleVerPerfil}>Mi cuenta</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    </div>
  );
};
