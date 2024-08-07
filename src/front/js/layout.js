import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { SignUp } from "./pages/SiginUp";
import { SignIn } from "./pages/SiginIn";
import { Perfil } from "./pages/Perfil";

import injectContext from "./store/appContext";
import { BuscadorDePsicologos } from "./pages/BuscadorDePsicologos";
import { Calendar_custom } from "./pages/Calendar";
import { CalendarCogif_custom } from "./pages/Calendar_Config";
import { CalendarToday_custom } from "./pages/Calendar_today";

import { Footer } from "./component/footer";
import "../styles/layout.css";
import Sessions from "./pages/Session";
// import { Expedientes } from "./pages/Expedientes";
import { PerfilUsuarioSeleccionado } from "./pages/Perfil_Usuario_Seleccionado";
import { MetodosDePago } from "./pages/Metodos_De_Pago";
import PrivateRoutes from "../utils/PrivateRoutes";
import ReservedSession from "./pages/ReservedSession";
import Calendar from "react-calendar";
import { Calendar_Psicologo } from "./pages/Calendar_Psicologo";
import { Expedientes } from "./pages/Expedientes";
import { PerfilPacienteSeleccionado } from "./pages/Perfil_Paciente_Seleccionado";
import { Panel } from "./pages/panel";
import { Contactos } from "./pages/contactos";
import { Buscador2 } from "./pages/BuscadorDePsicologos2";
import { Noticias } from "./pages/Noticias";
import { Cursos } from "./pages/Cursos";
import { Navbar2 } from "./component/navbar2";
import { Eventos } from "./pages/Eventos";
import { LoginSiginUp } from "./pages/LoginSiginUp";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
       <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* <Navbar /> */}
          <Navbar2 />
          <Routes>
            <Route element={<Home />} path="/"/>
            <Route element={<SignUp />} path="/signup"/>
            <Route element={<SignIn />} path="/signin"/>
            <Route element={<LoginSiginUp />} path="/LoginSiginUp"/>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Perfil />
                </div>
              </div>} 
              path="/perfil"
              />
             </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <PerfilUsuarioSeleccionado />
                </div>
              </div>}
              path="/perfil/:id"
              />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <MetodosDePago />
                </div>
              </div>}
              path="/metodosDePago"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <BuscadorDePsicologos />
                </div>
              </div>}
              path="/buscador"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Navbar2 />
                </div>
              </div>}
              path="/avatar"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Noticias />
                </div>
              </div>}
              path="/noticias"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Cursos />
                </div>
              </div>}
              path="Cursos"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Eventos />
                </div>
              </div>}
              path="Eventos"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="contenedor">
                <div id="paginaCentral">
                  <Calendar_custom />
                </div>
              </div>}
              path="/calendar"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Calendar_custom/>
                </div>
              </div>}
              path="/calendar/:id"
              />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <CalendarCogif_custom />
                </div>
              </div>}
              path="/calendar_config"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <CalendarToday_custom />
                </div>
              </div>}
              path="/calendar_today/:id"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Sessions />
                </div>
              </div>}
              path="/sessions"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Buscador2 />
                </div>
              </div>}
              path="/buscador2"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <ReservedSession/>
                </div>
              </div>}
              path="/session/:id/:room"
              />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                  <Expedientes/>
                </div>
              </div>}
              path="/Expedientes"
              />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                <PerfilPacienteSeleccionado />
                </div>
              </div>}
              path="/Expedientes/:id"
              />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                <div id="paginaCentral">
                <Panel />
                </div>
              </div>}
              path="/panel"
              />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                {/* <div id="navbar2">
                  <Sidebarx />
                </div> */}
                <div id="paginaCentral">
                <Contactos/>
                </div>
              </div>}
              path="/contactos"
              />
            </Route>
            <Route element={<h1>Not found!</h1>} path={"*"}/>
          </Routes>
          <Footer />
        </ScrollToTop>
      </ BrowserRouter>
    </div >
  );
};

export default injectContext(Layout);
