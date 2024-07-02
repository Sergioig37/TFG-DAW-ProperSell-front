// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AlertasDashboard } from "./components/alerta/AlertaDashboard";
import { AdminPanel } from "./components/admin/AdminPanel";
import { PropiedadesDashboard } from "./components/propiedades/PropiedadesDashboard";
import { AlertaCreate } from "./components/alerta/AlertaCreate";
import { AlertaUpdate } from "./components/alerta/AlertaUpdate";
import { PropiedadDetails } from "./components/propiedades/PropiedadDetails";
import { PropiedadUpdate } from "./components/propiedades/PropiedadUpdate";
import { PropiedadCreate } from "./components/propiedades/PropiedadCreate";
import { Explorar } from "./components/Explorar";
import { Unauthorized } from "./components/Unauthorized";
import { UsuariosDashboard } from "./components/usuario/UsuariosDashboard";
import { UsuarioAccount } from "./components/usuario/UsuarioAccount";
import { UsuarioDetails } from "./components/usuario/UsuarioDetails";
import { UsuarioUpdate } from "./components/usuario/UsuarioUpdate";
import { MisPropiedades } from "./components/propiedades/MisPropiedades";
import { MisAlertas } from "./components/alerta/MisAlertas";
import { Estadisticas } from "./components/estadisticas/Estadisticas";
import { NotFound } from "./components/NotFound";
import { Layout } from "./Layout";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Anonymous } from "./components/auth/Anonymous"; // Supongo que RequireAuth está en su propio archivo

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explorar />} />
          <Route path="/denegado" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}

          <Route element={<RequireAuth allowedRol={"ADMIN"} />}>
            <Route path="/admin/alerta-dashboard"element={<AlertasDashboard />}/>
            <Route path="/admin/propiedades-dashboard" element={<PropiedadesDashboard />}/>
            <Route path="/admin/usuarios-dashboard" element={<UsuariosDashboard />}/>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/alerta/edit/:id" element={<AlertaUpdate />} />
            <Route path="/alerta/create" element={<AlertaCreate />} />
            <Route path="/admin/alerta-dashboard" element={<AlertasDashboard />}/>
            <Route path="/admin/propiedades-dashboard" element={<PropiedadesDashboard />}/>
            <Route path="/admin/usuarios-dashboard" element={<UsuariosDashboard />}/>
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/usuario/:id" element={<UsuarioDetails />} />
          </Route>

          <Route element={<RequireAuth allowedRol={"USER"} />}>
            <Route path="/cliente/:id/propiedad/create"element={<PropiedadCreate />} />

            <Route path="/propiedad/edit/:id" element={<PropiedadUpdate />} />
            <Route path="/propiedad/create" element={<PropiedadCreate />} />

            <Route path="/mis-alertas" element={<MisAlertas />} />

            <Route path="/mis-propiedades" element={<MisPropiedades />} />
          </Route>

          <Route element={<RequireAuth allowedRol={""}/>}>
            <Route path="/account" element={<UsuarioAccount />} />
            <Route path="/usuario/edit" element={<UsuarioUpdate />} />
            <Route path="/account" element={<UsuarioAccount />} />
            <Route path="/propiedad/:id" element={<PropiedadDetails />} />
          </Route>

        <Route element={<Anonymous/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

        {/* Usar el comodín para manejar rutas no encontradas */}
      </Routes>
    </BrowserRouter>
  );
};
