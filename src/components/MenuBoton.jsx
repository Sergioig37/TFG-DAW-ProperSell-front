import React from 'react';
import { Dropdown, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export const MenuBoton = () => {
  const navigate = useNavigate();
  const { getUser, getRol, clearToken } = useAuth();
  const user = getUser();
  const rol = getRol();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  const handleVerPerfil = () => {
    navigate('/account');
  };

  return (
    <div className="menu-boton d-flex align-items-center">
      <div className="user-info me-3 text-white">
        <div className="user-name">{user}</div>
        <div className="user-role">{rol}</div>
      </div>
      <Dropdown align="end">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <FaUserCircle size={24} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
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


