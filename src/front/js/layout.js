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

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import "../styles/layout.css";
import Sessions from "./pages/Session";
import { Sidebarx } from "./component/SideBar";
// import { Expedientes } from "./pages/Expedientes";
import { PerfilUsuarioSeleccionado } from "./pages/Perfil_Usuario_Seleccionado";
import { MetodosDePago } from "./pages/Metodos_De_Pago";
import PrivateRoutes from "../utils/PrivateRoutes";
import ReservedSession from "./pages/ReservedSession";
import Calendar from "react-calendar";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
       <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/"/>
            <Route element={<SignUp />} path="/signup"/>
            <Route element={<SignIn />} path="/signin"/>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
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
                <div id="navbar2">
                  <Sidebarx />
                </div>
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
                <div id="navbar2">
                  <Sidebarx />
                </div>
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
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <BuscadorDePsicologos />
                </div>
              </div>}
              path="/buscador"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
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
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <Calendar_custom/>
                </div>
              </div>}
              path="/calendar/:id/"
              />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
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
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <CalendarToday_custom />
                </div>
              </div>}
              path="/calendar_today"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
              <div className="box">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <Sessions />
                </div>
              </div>}
              path="/sessions"
            />
            </Route>
            <Route element={<PrivateRoutes/>}>
            <Route element={
            <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <ReservedSession/>
                </div>
              </div>}
              path="/session/:id/:room"
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
