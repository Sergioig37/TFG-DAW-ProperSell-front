import { Route, BrowserRouter, Routes} from "react-router-dom"
import { LandingPage } from "./components/LandingPage"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { AgentesDashboard } from "./components/agente/AgentesDashboard"
import { ClientesDashboard } from "./components/cliente/ClientesDashboard"
import { AdminPanel } from "./components/admin/AdminPanel"
import { PropiedadesDashboard } from "./components/propiedades/PropiedadesDashboard"
import {AgenteProfile} from "./components/agente/AgenteProfile"
import { AgenteCreate} from "./components/agente/AgenteCreate"
import { AgenteUpdate } from "./components/agente/AgenteUpdate"
import { ClienteProfile } from "./components/cliente/ClienteProfile"
import { ClienteCreate } from "./components/cliente/ClienteCreate"
import { ClienteUpdate } from "./components/cliente/ClienteUpdate"
import { PropiedadProfile } from "./components/propiedades/PropiedadProfile"
import { PropiedadUpdate } from "./components/propiedades/PropiedadUpdate"
import { PropiedadCreate } from "./components/propiedades/PropiedadCreate"
import { Explorar } from "./components/Explorar"
import { Unauthorized } from "./components/Unauthorized"
import { UsuariosDashboard } from "./components/usuario/UusariosDashboard"
import { UsuarioAccount } from "./components/usuario/UsuarioAccount"
import { UsuarioProfile } from "./components/usuario/UsuarioProfile"
import { UsuarioUpdate } from "./components/usuario/UsuarioUpdate"


export const App = () => {


  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/explore" element={<Explorar/>}/>
            <Route path="/agente/:id" element={<AgenteProfile/>} />
            <Route path="/agente/edit/:id" element={<AgenteUpdate/>}/>
            <Route path="/agente/create" element={<AgenteCreate/>}/>
            <Route path="/cliente/:id" element={<ClienteProfile/>}/>
            <Route path="/cliente/create" element={<ClienteCreate/>}/>
            <Route path="/cliente/edit/:id" element={<ClienteUpdate/>}/>
            <Route path="/cliente/:id" element={<ClienteProfile/>}/>
            <Route path="/cliente/:id/propiedad/create" element={<PropiedadCreate/>}/>
            <Route path="/propiedad/:id" element={<PropiedadProfile/>}/>
            <Route path="/propiedad/edit/:id" element={<PropiedadUpdate/>}/>
            <Route path="/propiedad/create" element={<PropiedadCreate/>}/>
            <Route path="/admin/agentes-dashboard" element={<AgentesDashboard/>}/>
            <Route path="/admin/clientes-dashboard" element={<ClientesDashboard/>}/>
            <Route path="/admin/propiedades-dashboard" element={<PropiedadesDashboard/>}/>
            <Route path="/admin/usuarios-dashboard" element={<UsuariosDashboard/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>
            <Route path="/denegado" element={<Unauthorized/>}/>
            <Route path="/account" element={<UsuarioAccount/>}/>
            <Route path="/usuario/:username" element={<UsuarioProfile/>}/>
            <Route path="/usuario/edit/:username" element={<UsuarioUpdate/>}/>
            <Route path="/account" element={<UsuarioAccount/>}/>

          </Routes> 
        </BrowserRouter>
    </>
  )
}


