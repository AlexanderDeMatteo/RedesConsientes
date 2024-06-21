import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {Badge} from "@nextui-org/react";
import {Listbox, ListboxItem, Chip, ScrollShadow} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper.jsx";
import {users} from "./data";
import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  hasValidToken
} from '../../utils/AuthTokenUtil';

export const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isInvisible, setIsInvisible] = React.useState(false);

  const menuItems = [
    "Perfil",
    "Agenda del dia",
    "Contactos",
    "Expedientes",
    "Manejo de agenda",
    "Facturacion",
    "Modalidad de pago",
    "Noticias",
    "Buscador de psicologos",
    "tienda",
  ];

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
    <div className=" w-100% h-100%">
    <Navbar
      maxWidth="xl"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
        <i className="fa-solid fa-brain"></i>
        <p className="font-bold text-inherit">RedesConscientes</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarBrand>
        <i className="fa-solid fa-brain"></i>
        <p className="font-bold text-inherit">RedesConscientes</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
          Sobre nosotros
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Noticias
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Buscador de psicologos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            cursos
          </Link>
        </NavbarItem>
      </NavbarContent>
    
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        {!hasValidToken() ? <Link href="#">Login</Link> : ""}
        </NavbarItem>
        <NavbarItem>
        {!hasValidToken() ? <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button> : ""}
        </NavbarItem>

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
        <i class="fa-regular fa-bell" style={{"font-size":20, color:"grey"}}></i>
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
      
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">Perfil</DropdownItem>
            <DropdownItem key="team_settings">Agenda del dia</DropdownItem>
            <DropdownItem key="analytics">Contactos</DropdownItem>
            <DropdownItem key="system">Expedientes</DropdownItem>
            <DropdownItem key="configurations">Manejo de agenda</DropdownItem>
            <DropdownItem key="help_and_feedback">Facturacion</DropdownItem>
            <DropdownItem key="help_and_feedback">Modalidad de pago</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
    
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} >
            <Link
              className="w-100%"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    </div>
  );
}
