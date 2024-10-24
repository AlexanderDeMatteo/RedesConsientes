import React, { useState, useContext, useEffect } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, user} from "@nextui-org/react";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {Badge} from "@nextui-org/react";
import {Listbox, ListboxItem, Chip, ScrollShadow} from "@nextui-org/react";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import {ListboxWrapper} from "./ListboxWrapper.jsx";
import {users} from "./data";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  hasValidToken
} from '../../utils/AuthTokenUtil';
import { Notification } from "./buscador_componentes/navbarComponent.js/notification.js";

export const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { actions, store } = useContext(Context)
  const navigate = useNavigate();

   
  const id = {
      id: store.userData.id
  };
  let calendar = "calendar"
  let calendar_today = "calendar_today"
  
  function handleClick(a) {
  navigate(`/${a}/${store.userData.id}`);
  }

  const menuItemsPsicologo = [
    {name:"Perfil", url:"perfil"},
    {name:"Agenda del dia", url:`calendar_today/${store.userData.id}`},
    {name:"Contactos", url:"contactos"},
    {name:"Expedientes", url:"expedientes"},
    {name:"Manejo de agenda", url:`manejo_de_agenda/${store.userData.id}`},
    {name:"Facturacion", url:"facturacion"},
    {name:"Modalidad de pago", url:"metodosDePago"},
    {name:"Noticias", url:"noticias"},
    {name:"Buscador de psicologos", url:"buscador"},
    {name:"Cursos", url:"cursos"},
    {name:"Cerrar sesión", url:"#"},
  ];

  const menuItems = [
    {name:"Perfil", url:"perfil"},
    {name:"Agenda del dia", url:`calendar_today/${store.userData.id}`},
    {name:"Contactos", url:"contactos"},
    {name:"Buscador de psicologos", url:"buscador"},
    {name:"Cerrar sesión", url:"#"},
  ];


  useEffect(() => {
    actions.handle_user_data()
}, [])

  const [values, setValues] = React.useState(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>{users.find((user) => `${user.id}` === `${value}`).name}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <div className=" navbar p-0 " >
    <Navbar
      maxWidth="xl"
      isBordered
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      >
        <>
        {!hasValidToken() ? "" :
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
        }
        </>

      <NavbarContent className="sm:hidden " justify="center">
        <NavbarBrand>
        <p className="font-bold text-inherit titulo">RedesConscientes</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarBrand>
        <p className="font-bold text-inherit titulo">RedesConscientes</p>
        </NavbarBrand>
      </NavbarContent>

      <>
      {!hasValidToken() ? "":
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
        <NavbarItem isActive>
          <Link href="/noticias" aria-current="page">
            Noticias
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/buscador" className=" subtitulo">
            Buscador de psicologos
          </Link>
        </NavbarItem>
        {store.userData.role_id == 2 || store.userData.role_id == 3 ? 

          <NavbarItem>
          <Link color="foreground" className="subtitulo" href="/cursos">
          Cursos
          </Link>
          </NavbarItem>
        : " "}
        <NavbarItem>
          <Link color="foreground" className=" subtitulo" href="/eventos">
            Eventos
          </Link>
        </NavbarItem>
      </NavbarContent>
        }
      </>

      <>
    {!hasValidToken() ?
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" className=" subtitulo" href="/">
        Home
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="/sobre-nosotros" className=" subtitulo" aria-current="/">
        Sobre nosotros
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" className=" subtitulo" href="/contact">
        Contacto
        </Link>
      </NavbarItem>
    </NavbarContent>
       : ""}
    </>

    <>
    {!hasValidToken() ?
      <NavbarContent justify="end" className="">
        
        <NavbarItem>
          <Button as={Link} className="main-button subtitulo" href="/loginsiginup" variant="flat">
            Ingresa
          </Button> 
        </NavbarItem>
      </NavbarContent>
       : ""}
    </>

    <>
    {!hasValidToken() ? "" :
    <NavbarContent  justify="end" >
    <Notification/>

    <Badge content="99+" shape="circle" color="warning">
       <Dropdown >
      <DropdownTrigger>
        <Button
        radius="full"
        isIconOnly
        aria-label="more than 99 notifications"
        variant="light"
        isInvisible="true"
        >
        <i class="fa-regular fa-comments" style={{"font-size":20, color:"grey"}}></i>
      </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown> 
    </Badge>
    {/*  */}

    <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <DropdownTrigger >
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="md"
              onClick={console.log(store.userData.role_id == 2)}
              src={store.userData.profile_picture
                ? store.userData.profile_picture
                : psicologo_img}
              />
          </DropdownTrigger>
          {store.userData.role_id == 2 || store.userData.role_id == 3 ? 
          <>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold cuerpoTexto">Signed in as {store.userData.name}</p>
              <p className="font-semibold cuerpoTexto">{store.userData.email}</p>
            </DropdownItem>
            <DropdownItem key="Perfil" className="subtitulo" href="/perfil">Perfil</DropdownItem>
            <DropdownItem key="Agenda_del_dia" onClick={() => handleClick(calendar_today)} >Agenda del dia</DropdownItem>
            <DropdownItem key="Contactos" className="subtitulo" href="/contactos">Contactos</DropdownItem>
            <DropdownItem key="Expedientes" className="subtitulo" href="/Expedientes">Expedientes</DropdownItem>
            <DropdownItem key="Manejo_de_agend" className="subtitulo" onClick={() => handleClick(calendar)}>Manejo de agenda</DropdownItem>
            <DropdownItem key="Facturacion" className="subtitulo">Facturacion</DropdownItem>
            <DropdownItem key="Modalidad_de_pago" className="subtitulo">Modalidad de pago</DropdownItem>
            <DropdownItem key="logout" onClick={(e) => {
              removeAuthToken()
              navigate("/")
            }} color="danger" className="subtitulo">
              Log Out
            </DropdownItem>
          </DropdownMenu>
          </>
              : 
              <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold cuerpoTexto">Signed in as {store.userData.name}</p>
              <p className="font-semibold cuerpoTexto">{store.userData.email}</p>
            </DropdownItem>
            <DropdownItem key="Perfil" className="subtitulo" href="/perfil">Perfil</DropdownItem>
            <DropdownItem key="Agenda_del_dia" className="subtitulo" onClick={() => handleClick(calendar_today)} >Agenda del dia</DropdownItem>
            <DropdownItem key="Contactos" className="subtitulo" href="/contactos">Contactos</DropdownItem>
            <DropdownItem key="logout" onClick={(e) => {
              removeAuthToken()
              navigate("/")
            }} color="danger" className="subtitulo">
              Log Out
            </DropdownItem>
          </DropdownMenu>
              }
        </Dropdown>
      </NavbarContent>
    </NavbarContent>
   }
    </>
        <>
        {!hasValidToken() ? 
        " "
        :   
        <>
        {store.userData.role_id == 2 || store.userData.role_id == 3 ? 
      <NavbarMenu>
        {menuItemsPsicologo.map((item, index) => (   
          <NavbarMenuItem key={`${item}-${index}`} >
          <Link
          className="w-100% subtitulo"
          color={
            index === 2 ? "warning" : index === menuItemsPsicologo.length - 1 ? "danger" : "foreground"
          }
          href={`/${item.url}`}
          size="lg"
          onClick={ item.name == "Cerrar sesión" ? (e) => {
            removeAuthToken()
            navigate("/")
          } : ""}
          >
          {item.name}
          </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      : 
      <NavbarMenu>
      {menuItems.map((item, index) => (   
        <NavbarMenuItem key={`${item}-${index}`} >
        <Link
        className="w-100%"
        color={
          index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
        }
        href={`/${item.url}`}
        size="lg"
        onClick={ item.name == "Cerrar sesión" ? (e) => {
          removeAuthToken()
          navigate("/")
        } : ""}
        
        >
        {item.name}
        </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>}
        </>
    }
    </>
    </Navbar>
    </div>
  );
}
