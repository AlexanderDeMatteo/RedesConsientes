import React, { useState, useContext, useEffect } from "react";
import { Card } from "../buscador_componentes/CardBuscador";
import { Context } from "../../store/appContext.js";
import PropsType from "prop-types";
import { Pagination } from "./pagination.js";

export const PsicologoCards = ({ filtros }) => {             // recibe por props los argumentos para filtrar
  const { actions, store } = useContext(Context);
  const [psicologyPerPage, setsicologyPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const psicology = store.userPsicologos
  const psicologytotal = psicology.length

  const lastIndex = currentPage * psicologyPerPage
  const firstIndex = lastIndex - psicologyPerPage



  const filtrado = () => {             // Funcion en donde se filtran los psicologos mediante los datos recibidos
    let filtrados = store.userPsicologos.filter(psico =>
      (parseInt(psico.monto_consulta?.replace("$", "")) < parseInt(filtros?.precio.replace("$", "").toLowerCase()))
      || psico.name.toLowerCase() == filtros?.nombre.toLowerCase()
      || psico.fpv_number == filtros?.numeroFpv
      || psico.state?.toLowerCase() == filtros?.estado?.toLowerCase()
      || psico.city?.toLowerCase() == filtros?.ciudad?.toLowerCase()
      || psico.cedula == filtros?.cedula
      || psico.gender?.toLowerCase() == filtros?.sexo?.toLowerCase()
      // || (psico.dob >= filtros?.edadMin && psico.dob <= filtros?.edadMax)
      || psico.specialty_area?.toLowerCase() == filtros?.especialidades?.toLowerCase()
    )
    if(filtrados.length == 0){
      console.log("hola")
    }
    return filtrados
  }

  console.log(store.userPsicologos)

  return (
    <div style={{ margin: "inherit" }}>
      <div className="container-fluid">
        <div className="row mt-2" style={{ textAlign: "-webkit-center" }}>

          {
            filtrado() == "" ?   // Verifica que se haya hecho un filtro. Sino, se muestran todos los psicologos
              store.userPsicologos.map((vistaPsicologo, index) => {
                return (
                  <Card
                    key={index}
                    id={vistaPsicologo.id}
                    area_de_especialidad={vistaPsicologo.area_de_especialidad}
                    name={vistaPsicologo.name}
                    precio_consulta={parseInt(vistaPsicologo.monto_consulta.replace("$", ""), 10)}
                    profile_picture={vistaPsicologo.profile_picture}
                    state={vistaPsicologo.state}
                    city={vistaPsicologo.city}
                    numberFpv={vistaPsicologo.fpv_number}
                    phoneNumber={vistaPsicologo.phone_number}
                    colSpacing="col-4"
                    specialty_area={vistaPsicologo.specialty_area}
                    cedula={vistaPsicologo.cedula}
                  />
                );
              }).slice(firstIndex, lastIndex)
              : // Se muestran los psicologos filtrados 
              filtrado().map((vistaPsicologo, index) => {
                return (
                  <Card
                    key={index}
                    id={vistaPsicologo.id}
                    area_de_especialidad={vistaPsicologo.area_de_especialidad}
                    name={vistaPsicologo.name}
                    precio_consulta={vistaPsicologo.monto_consulta}
                    profile_picture={vistaPsicologo.profile_picture}
                    state={vistaPsicologo.state}
                    city={vistaPsicologo.city}
                    phoneNumber={vistaPsicologo.phone_number}
                    numberFpv={vistaPsicologo.fpv_number}
                    colSpacing="col-4"
                  />
                );
              }).slice(firstIndex, lastIndex)
          }
        </div>
      </div>
      <Pagination
        psicologyPerPage={psicologyPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        psicologytotal={psicologytotal} />
    </div>
  );
};

PsicologoCards.propsType = {
  filtros: PropsType.object
}