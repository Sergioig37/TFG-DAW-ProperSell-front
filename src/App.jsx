import { Route, BrowserRouter, Routes} from "react-router-dom"
import { LandingPage } from "./components/LandingPage"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { HomePage } from "./components/HomePage"
import { AgenteDashboard } from "./components/agente/AgenteDashboard"
import { InmobiliariaDashboard } from "./components/Inmobiliaria/InmobiliariaDashboard"
import { ClienteDashboard } from "./components/cliente/ClienteDashboard"
import { AdminPanel } from "./components/admin/AdminPanel"


export const App = () => {


  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/admin/agentes-dashboard" element={<AgenteDashboard/>}/>
            <Route path="/admin/inmobiliarias-dashboard" element={<InmobiliariaDashboard/>}/>
            <Route path="/admin/clientes-dashboard" element={<ClienteDashboard/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>
          </Routes> 
        </BrowserRouter>
    </>
  )
}


