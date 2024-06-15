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
      <NavbarGeneral />
      <div style={styles.container}>
        <div style={styles.content}>
          <h1>Ups, lo sentimos, esto no es lo que buscabas</h1>
          <p>La página que estás buscando no existe.</p>
          <Button variant="primary" onClick={handleVolver}>
            Volver a inicio
          </Button>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    textAlign: "center",
    maxWidth: "600px", // Ajusta el ancho máximo del contenido
    padding: "20px",
  },
};
