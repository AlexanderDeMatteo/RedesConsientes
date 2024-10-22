import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/buscador_de_psicologos.css"
import { Context } from "../store/appContext.js";
import { PsicologoCards } from "../component/buscador_componentes/PsicologoCard.js";
import { Filtro2 } from "./BuscadorDePsicologos2.js";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Accordion, AccordionItem, Select, SelectItem} from "@nextui-org/react";

export const BuscadorDePsicologos = () => {
    const { actions, store } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
      };

    const [filtros, setFiltros] = useState({       // estado donde se guardan los parametros del filtro
        precio: "",
        nombre: "",
        apellido:"",
        numeroFpv: "",
        especialidades: "",
        estado: "",
        ciudad: ""
    })
   
    let psicologos = store.userPsicologos

    console.log(psicologos)

    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value.toLowerCase() })
    }

    let especialidades = ["todos","Psicología Cognitiva", "Psicología Clínica",   // array de las especialidades
        "Neuro Psicología", "Psicólogia Biológica",
        "Psicología Comparativa o Etiología", "Psicología Educativa",
        "Psicología Evolutiva", "Psicología del Deporte",
        "Psicología Jurídica", "Psicología de la Personalidad",
        "Psicología de la Salud", "Psicología de Parejas",
        "Psicología Familiar", "Psicología Empresarial y Organizacional",
        "Psicología Militar", "Psicología Escolar",
        "Psicología Gerontológica", "Psicología Experimental",
        "Psicología Del Desarrollo", "Psicología de Ingeniería",
        "Psicología del Marketing", "Sexología", "Psicología Clinica",
        "Psicología comunitaria"]

    // useEffect(() => {
    //     // actions.privateData()
    //     actions.handle_user_psicologo();
    // }, [])

    useEffect(() => {
      const fetchData = async() =>{
          setIsLoading(true)
          try{
              const data = await actions.handle_user_psicologo();
          } catch (error) {
              console.error(error); // Handle any errors
            } finally {
              setIsLoading(false); // Finalizar la carga
          }

      }
      fetchData()

  }, [])

    console.log(store.userPsicologos)


    return (
        <>
            <div className="content-wrapper">
                <div className="boxPrincipal">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex py-1 justify-content-start" >
                        <h1>Encuentra tu psicologo ideal</h1>
                    </div>

                    <div class="dropdown">
  {/* <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button> */}
    <Button 
          variant="bordered" 
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Open Menu
    </Button>

  <ul class="dropdown-menu p-0 rounded-full  min-w-[300px]">
  <Accordion

      showDivider={false}
      variant="shadow"
      itemClasses={itemClasses}
    >
      <AccordionItem
        key="1"
        aria-label="Connected devices"
        startContent={<i class="fa-solid fa-users-viewfinder"></i>}
        title="Buscar por Nombre"
      >
       <Input
      autoFocus
      label="Buscar"
      // isClearable
      radius="lg"
      name="nombre"
      onChange={(e) => handleChange(e)}
      // placeholder=""
      startContent={
        <i class="fa-solid fa-magnifying-glass"></i>
      }
    />
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Connected devices"
        startContent={<i class="fa-solid fa-users-viewfinder"></i>}
        title="Buscar por Apellido"
      >
       <Input
      autoFocus
      label="Buscar"
      isClearable
      radius="lg"
      name="apellido"
      onChange={(e) => handleChange(e)}
      placeholder="Buscar..."
      startContent={
        <i class="fa-solid fa-magnifying-glass"></i>
      }
    />
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Apps Permissions"
        startContent={<i class="fa-regular fa-address-card"></i>}
        // subtitle="3 apps have read permissions"
        title="Buscar por Numero FPV"
      >
        <Input
      autoFocus
      name="numeroFpv"
      label="Buscar"
      isClearable
      radius="lg"
      onChange={(e) => handleChange(e)}
      placeholder="Buscar..."
      startContent={
        <i class="fa-solid fa-magnifying-glass"></i>
      }
    />
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Pending tasks"
        startContent={<i class="fa-solid fa-brain"></i>}
        title="Buscar por Especialidad"
        // title="Pending tasks"
      >
        <Select
            label="Buscar"
            name="especialidades"
            placeholder="Selecciona una especialidad"
            className="max-w-xs"
            onChange={(e) => handleChange(e)}
        >
            {especialidades.map((especialidad) => (
                <SelectItem key={especialidad} value={especialidad}>
                    {especialidad}
                </SelectItem>
            ))}
        </Select>   
      </AccordionItem>
      <AccordionItem
        key="5"
        aria-label="Card expired"
        classNames={{ subtitle: "text-danger" }}
        startContent={<i class="fa-solid fa-location-dot"></i>}
        title="Buscar por Ciudad"
      >
       <Input
      autoFocus
      name="ciudad"
      label="Buscar"
      isClearable
      radius="lg"
      onChange={(e) => handleChange(e)}
      placeholder="Buscar..."
      startContent={
        <i class="fa-solid fa-magnifying-glass"></i>
      }
    />
      </AccordionItem>
      <AccordionItem
        key="6"
        aria-label="Card expired"
        classNames={{ subtitle: "text-danger" }}
        startContent={<i class="fa-solid fa-location-dot"></i>}
        title="Buscar por Estado"
      >
       <Input
      autoFocus
      name="estado"
      label="Buscar"
      isClearable
      radius="lg"
      onChange={(e) => handleChange(e)}
      placeholder="Buscar..."
      startContent={
        <i class="fa-solid fa-magnifying-glass"></i>
      }
    />
      </AccordionItem>
    </Accordion>
  </ul>
</div>
                  </div>

                    <div className="boxBuscador">
                        <PsicologoCards filtros={filtros} psicologos={psicologos} />
                    </div>


                </div>
            </div>
        </>
    )
}
