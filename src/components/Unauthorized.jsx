import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Unauthorized = () => {

    const navigate = useNavigate();

    const handleVolver = () => {
        navigate("/explore");
    }

    return (
        <>
            <h1>NO ESTÁS AUTORIZADO A ENTRAR EN ESTA PÁGINA</h1>
            <Button onClick={handleVolver}>Volver a inicio</Button>
        </>
    )
}