import * as React from "react";
import { Dropdown, ButtonGroup, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export const MenuBoton = () => {
  const navigate = useNavigate();
  const user = useAuth().getUser();
  const rol = useAuth().getRol();
  const { clearToken } = useAuth();

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  const handleVerPerfil = () => {
    navigate("/account");
  };

  return (
    <div className="d-flex align-items-center">
      <span className="me-2 text-white">
        {user} ({rol})
      </span>
      <Dropdown as={ButtonGroup}>
        <Button variant="outline-light" className="d-flex align-items-center">
          <FaUserCircle size={24} />
        </Button>
        <Dropdown.Toggle split variant="outline-light" id="dropdown-split-basic" />
        <Dropdown.Menu align="end">
          <Dropdown.Item onClick={handleVerPerfil}>
            <FaUserCircle className="me-2" />
            Mi cuenta
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Cerrar Sesión
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
