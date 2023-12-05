import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { Expedientes } from "./pages/Expedientes";
import { PerfilUsuarioSeleccionado } from "./pages/Perfil_Usuario_Seleccionado";
import { MetodosDePago } from "./pages/Metodos_De_Pago";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <Router>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route exact path="/">
              {/* <Navbar /> */}
              <Home />
            </Route>
            <Route exact path="/1">
              <Sidebarx />
            </Route>
            <Route exact path="/signup">
              {/* <Navbar /> */}
              <SignUp />
            </Route>
            <Route exact path="/signin">
              {/* <Navbar /> */}
              <SignIn />
            </Route>
            <Route exact path="/perfil">
              {/* <Navbar3 /> */}
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <Perfil />
                </div>
              </div>
            </Route>
            <Route exact path="/perfil/:id">
              {/* <Navbar3 /> */}
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <PerfilUsuarioSeleccionado />
                </div>
              </div>
            </Route>
            <Route exact path="/expedientes">
              {/* <Navbar3 /> */}
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <Expedientes />
                </div>
              </div>
            </Route>
            <Route exact path="/metodosDePago">
              {/* <Navbar3 /> */}
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <MetodosDePago />
                </div>
              </div>
            </Route>
            <Route exact path="/buscador">
              <div className="box">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <BuscadorDePsicologos />
                </div>
              </div>
            </Route>
            <Route exact path="/calendar">
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <Calendar_custom />
                </div>
              </div>
            </Route>
            <Route exact path="/calendar_config">
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <CalendarCogif_custom />
                </div>
              </div>
            </Route>
            <Route exact path="/calendar_today">
              <div className="contenedor">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <CalendarToday_custom />
                </div>
              </div>
            </Route>
            <Route path={"/sessions"}>
              <div className="box">
                <div id="navbar2">
                  <Sidebarx />
                </div>
                <div id="paginaCentral">
                  <Sessions />
                </div>
              </div>
            </Route>
            <Route path={"*"}>
              <h1>Not found!</h1>
            </Route>
          </Routes>
          <Footer />
        </ScrollToTop>
      </Router>
    </div >
  );
};

export default injectContext(Layout);
