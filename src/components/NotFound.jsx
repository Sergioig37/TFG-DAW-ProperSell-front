import { useNavigate } from "react-router-dom";
import { NavbarGeneral } from "./NavbarGeneral";
import { Button } from "react-bootstrap";


export const NotFound = () => {

  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/");
  };

  return (
    <>
    <NavbarGeneral/>
      <div>
        <h1>Ups, lo sentimos, esto no es lo que buscabas</h1>
        <p>La página que estás buscando no existe.</p>
      </div>
      <Button variant="primary" onClick={handleVolver}>
        Volver a inicio
      </Button>
    </>
  );
};
