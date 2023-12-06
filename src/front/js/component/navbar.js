import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink,redirect} from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import psicologo_img from "../component/perfil_componentes/psicologo.png";

import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  hasValidToken
} from '../../utils/AuthTokenUtil';
export const Navbar = () => {
  const [isLogOut, setIsLogOut] = useState(false);
  const { actions, store } = useContext(Context);

  const navigate = useNavigate()

  const handleLogOut = () =>{
    setIsLogOut(true)
  }

  useEffect(() => {
    actions.handle_user_data();
  }, []);

  // useEffect(() => {
    
  //   if (getAuthToken() && isLogOut) setIsLogOut(false);
  // }, [isLogOut]);


  return (
    <div className="wrapper">

      <nav className="main-header navbar navbar-expand navbar-white navbar-light" id="navbarcontainer">

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="/perfil" role="button"><i className="fa-solid fa-brain"></i></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/perfil" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">sobre nosotros</a>
          </li>
          {!hasValidToken() ? <li className="nav-item d-none d-sm-inline-block">
            <a href="/signup" className="nav-link">Registro</a>
          </li> : ""}
          {!hasValidToken() ? <li className="nav-item d-none d-sm-inline-block">
            <a href="/signin" className="nav-link">Login</a>
          </li> : ""}
          {store.userData.is_psicologo ? <li className="nav-item d-none d-sm-inline-block">
            <a href="/#" className="nav-link">Noticias</a>
          </li> : ""}
          {store.userData.is_psicologo ? <li className="nav-item d-none d-sm-inline-block">
            <a href="/#" className="nav-link">Mercado</a>
          </li> : ""}
        </ul>

        <ul className="navbar-nav ml-auto">

          {/* <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" data-target="#main-header-search" href="#" role="button">
              <i className="fas fa-search"></i>
            </a>
            <div className="navbar-search-block" id="main-header-search">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}

          <li className="nav-item dropdown">
            {hasValidToken() ? <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments"></i>
              <span className="badge badge-danger navbar-badge">3</span>
            </a> : ""}
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src={
                    store.userData.profile_picture
                      ? store.userData.profile_picture
                      : psicologo_img
                  } alt="User Avatar" className="img-size-50 mr-3 img-circle" />

                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">Call me whenever you can
                    </p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src={
                    store.userData.profile_picture
                      ? store.userData.profile_picture
                      : psicologo_img} alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src={
                    store.userData.profile_picture
                      ? store.userData.profile_picture
                      : psicologo_img} alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>

          <li className="nav-item dropdown">
            {hasValidToken() && <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell"></i>
              <span className="badge badge-warning navbar-badge">15</span>
            </a>}
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">15 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2"></i> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider"></div>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>
          {hasValidToken() ?
            <li className="nav-item dropdown" id="hola">
              <a className="nav-link dropdown-toggle arrow-avatar" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                {store.userData.profile_picture ? <img id="avatar"
                  width="40" height="40" className="rounded-circle img-fluid"
                  src={store.userData.profile_picture}
                  alt="Sample image"
                /> : <img id="avatar"
                  width="40" height="40" className="rounded-circle img-fluid"
                  src={psicologo_img}
                  alt="Sample image" />}
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><NavLink to="/perfil">Perfil</NavLink></li>
                {/* <li className="dropdown-item"><NavLink to="/status">Status</NavLink></li>
                <li className="dropdown-item"><NavLink to="/facturacion">Facturacion</NavLink></li> */}
                <li onClick={(e) => {
                    removeAuthToken()
                    navigate("/")
                
                  // handleLogOut()
                  // setIsLogOut(true)
                }} className="dropdown-item">Log Out</li>
              </ul>
            </li>
            : ""}
          {/* {hasValidToken() && navigate("/")} */}
        </ul>
      </nav >
    </div >
  );
};

// <nav id="menu" className="navbar navbar-expand-sm nav justify-content-center">
// 	<NavLink className="nav-link" id="nav-item" to="/">Home</NavLink>
// 	<NavLink className="nav-link" id="nav-item" to="/servicios">Servicios</NavLink>
// 	<NavLink className="nav-link" id="nav-item" to="/about_us">About Us</NavLink>
// 	{!hasValidToken() ? <NavLink className="nav-link" id="nav-item"
// 		to="/signup">registro</NavLink> : ""}
// 	{!hasValidToken() ? <NavLink className="nav-link" id="nav-item" to="/signin">Login</NavLink> : ""}
// 	{/* {!hasValidToken() && store.userData.is_psicologo ? <NavLink className="nav-link" to="/market_place">Mercado</NavLink> : ""} */}
// 	<NavLink className="nav-link" id="nav-item" to="/noticias">Noticias</NavLink>

// 	{hasValidToken() ?
// 		<li className="nav-item dropdown" id="hola">
// 			<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
// 				{store.userData.profile_picture ? <img id="avatar"
// 					width="40" height="40" className="rounded-circle img-fluid"
// 					src={store.userData.profile_picture}
// 					alt="Sample image"
// 				/> : <img id="avatar"
// 					width="40" height="40" className="rounded-circle img-fluid"
// 					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
// 					alt="Sample image" />}
// 			</a>
// 			<ul className="dropdown-menu">
// 				<li className="dropdown-item"><NavLink to="/perfil">Perfil</NavLink></li>
// 				<li className="dropdown-item"><NavLink to="/status">Status</NavLink></li>
// 				<li className="dropdown-item"><NavLink to="/facturacion">Facturacion</NavLink></li>
// 				<li onClick={(e) => {
// 					localStorage.removeItem("token");
// 					setIsLogOut(true)
// 				}} className="dropdown-item">Log Out</li>
// 			</ul>
// 		</li>
// 		: ""}
// 	{isLogOut && <Redirect to={"/"} />}
// </nav>
