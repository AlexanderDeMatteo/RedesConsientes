import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink,redirect} from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";

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



  return (
    <div className="wrapper">

      <nav className="main-header navbar navbar-expand navbar-white navbar-light" id="navbarcontainer">

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/perfil" role="button"><i className="fa-solid fa-brain"></i></a>
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
            <a href="/noticias" className="nav-link">Noticias</a>
          </li> : ""}
          {store.userData.is_psicologo ? <li className="nav-item d-none d-sm-inline-block">
            <a href="/#" className="nav-link">Mercado</a>
          </li> : ""}
        </ul>

        <ul className="navbar-nav ml-auto">
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
            <div className="flex items-center gap-4">
            {/* <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar id="avatar"
                  isBordered
                  as="button"
                  className="transition-transform object-cover"
                  src={!store.userData.profile_picture ? psicologo_img : store.userData.profile_picture }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{store.userData.name}</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  Perfil
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User 
                  id="avatar"
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src:!store.userData.profile_picture ? psicologo_img : store.userData.profile_picture 
                  }}
                  height="40px"
                  
                  className=" jose transition-transform"
                  description="@tonyreichert"
                  name={store.userData.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" id="as" className="h-14 gap-2">
                  <p className=" font-bold" >Signed in as {store.userData.name}</p>
                  <p className=" font-bold" >@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="perfil" href="perfil">
                  Perfil
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={(e) => {
                    removeAuthToken()
                    navigate("/")
                }}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
            : ""}
          {/* {hasValidToken() && navigate("/")} */}
        </ul>
      </nav >
    </div >
  );
};


