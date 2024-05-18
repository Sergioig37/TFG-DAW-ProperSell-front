import { Route, BrowserRouter, Routes} from "react-router-dom"
import { LandingPage } from "./components/LandingPage"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { HomePage } from "./components/HomePage"
import { AgentesDashboard } from "./components/agente/AgentesDashboard"
import { InmobiliariasDashboard } from "./components/Inmobiliaria/InmobiliariasDashboard"
import { ClientesDashboard } from "./components/cliente/ClientesDashboard"
import { AdminPanel } from "./components/admin/AdminPanel"
import { PropiedadesDashboard } from "./components/propiedades/PropiedadesDashboard"
import {AgenteProfile} from "./components/agente/AgenteProfile"
import { AgenteCreate } from "./components/agente/AgenteCreate"
import { AgenteUpdate } from "./components/agente/AgenteUpdate"


export const App = () => {


  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/agente/:id" element={<AgenteProfile/>} />
            <Route path="/agente/edit/:id" element={<AgenteUpdate/>}/>
            <Route path="/agente/create" element={<AgenteCreate/>}/>
            <Route path="/admin/agentes-dashboard" element={<AgentesDashboard/>}/>
            <Route path="/admin/inmobiliarias-dashboard" element={<InmobiliariasDashboard/>}/>
            <Route path="/admin/clientes-dashboard" element={<ClientesDashboard/>}/>
            <Route path="/admin/propiedades-dashboard" element={<PropiedadesDashboard/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>

          </Routes> 
        </BrowserRouter>
    </>
  )
}


