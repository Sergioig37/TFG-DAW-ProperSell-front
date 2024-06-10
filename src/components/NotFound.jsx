import { NavbarGeneral } from "./NavbarGeneral";


export const NotFound = () => {
  return (
    <>
    <NavbarGeneral/>
      <div>
        <h1>Ups, lo sentimos, esto no es lo que buscabas</h1>
        <p>La página que estás buscando no existe.</p>
      </div>
    </>
  );
};
