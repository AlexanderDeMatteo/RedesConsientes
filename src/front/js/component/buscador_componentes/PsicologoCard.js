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
      (psico.monto_consulta < filtros?.precio && psico.monto_consulta !== null)
      || psico.name.toLowerCase() == filtros?.nombre.toLowerCase()
      || psico.fpv_number == filtros?.numeroFpv
      || psico.state == filtros?.estado
      || psico.city == filtros?.ciudad
      || psico.dni == filtros?.ci
      || psico.gender == filtros?.sexo
      // || (psico.dob >= filtros?.edadMin && psico.dob <= filtros?.edadMax)
      || psico.specialty_area == filtros?.especialidades
    )
    return filtrados
  }

  console.log(filtrado())

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
                    precio_consulta={vistaPsicologo.monto_consulta}
                    profile_picture={vistaPsicologo.profile_picture}
                    state={vistaPsicologo.state}
                    city={vistaPsicologo.city}
                    numberFpv={vistaPsicologo.fpv_number}
                    phoneNumber={vistaPsicologo.phone_number}
                    colSpacing="col-4"
                    specialty_area={vistaPsicologo.specialty_area}
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