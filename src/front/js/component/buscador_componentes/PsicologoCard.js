import React, { useState, useContext, useEffect } from "react";
import { Card } from "../buscador_componentes/CardBuscador";
import { Context } from "../../store/appContext.js";
import {Spinner} from "@nextui-org/react";
import PropsType from "prop-types";
import { Pagination2 } from "./pagination.js";

export const PsicologoCards = ({ filtros, psicologos }) => {             // recibe por props los argumentos para filtrar
  const { actions, store } = useContext(Context);
  const [psicologyPerPage, setsicologyPerPage] = useState(8);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const psicologytotal = psicologos.length
  const lastIndex = currentPage * psicologyPerPage
  const firstIndex = lastIndex - psicologyPerPage
  
  
  
  
  const filtrado = () => {             // Funcion en donde se filtran los psicologos mediante los datos recibidos
    let filtrados = psicologos.filter(psico =>
      (parseInt(psico.monto_consulta?.replace("$", "")) < parseInt(filtros?.precio.replace("$", "").toLowerCase()))
      || psico.name.toLowerCase() == filtros?.nombre.toLowerCase()
      || psico.last_name.toLowerCase() == filtros?.apellido.toLowerCase()
      || psico.fpv_number == filtros?.numeroFpv
      || psico.state?.toLowerCase() == filtros?.estado?.toLowerCase()
      || psico.city?.toLowerCase() == filtros?.ciudad?.toLowerCase()
      || psico.specialty_area?.toLowerCase() == filtros?.especialidades?.toLowerCase()
    )
    if(filtrados == ""){
        
    }
    return filtrados
  }
  
  const filtrados = filtrado();
  const psicologyFiltradosTotal = filtrados.length;

  const totalPerPage = psicologyFiltradosTotal == 0 ? psicologytotal : psicologyFiltradosTotal


  useEffect(() => {
    setIsLoading(true);

    // Simular la carga de datos (reemplazar con tu lógica real)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);

      // Calcular TotalPageFinal después de que los datos se hayan cargado
      const filtrados = filtrado();
      const psicologyFiltradosTotal = filtrados.length;
      const totalPerPage = psicologyFiltradosTotal === 0 ? psicologos.length : psicologyFiltradosTotal;
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(totalPerPage / psicologyPerPage); i++) {
        pageNumbers.push(i);
      }
      setTotalPageFinal(pageNumbers.length);
      setDataLoaded(true); // Indica que los datos se han cargado
    }, 1000); // Ajusta el tiempo de espera según tus necesidades

    return () => clearTimeout(timeoutId);
  }, [filtros]);



  return (
    <div style={{ margin: "inherit" }}>
      <div className="container-fluid">
      {isLoading ?  <Spinner color="secondary"/> :
          <>
        <div className="row mt-2 Height 75%" style={{ textAlign: "-webkit-center" }}>

          {
            filtrado() == "" || filtros?.especialidades?.toLowerCase() == "todas" ?   // Verifica que se haya hecho un filtro. Sino, se muestran todos los psicologos
            psicologos.map((vistaPsicologo, index) => {
                return (
                  <Card
                    key={index}
                    id={vistaPsicologo.id}
                    name={vistaPsicologo.name}
                    lastname={vistaPsicologo.last_name}
                    precio_consulta={parseInt(vistaPsicologo.monto_consulta?.replace("$", ""), 10)}
                    profile_picture={vistaPsicologo.profile_picture}
                    state={vistaPsicologo.state}
                    city={vistaPsicologo.city}
                    numberFpv={vistaPsicologo.fpv_number}
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
                  name={vistaPsicologo.name}
                  lastname={vistaPsicologo.last_name}
                  precio_consulta={parseInt(vistaPsicologo.monto_consulta?.replace("$", ""), 10)}
                  profile_picture={vistaPsicologo.profile_picture}
                  state={vistaPsicologo.state}
                  city={vistaPsicologo.city}
                  numberFpv={vistaPsicologo.fpv_number}
                  colSpacing="col-4"
                  specialty_area={vistaPsicologo.specialty_area}
                  />
                );
              }).slice(firstIndex, lastIndex)
          }
        </div>
    <div>
      <Pagination2
        psicologyPerPage={psicologyPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPerPage={totalPerPage} 
        />
    </div>
        </>
      }
    </div>
    </div>
  );
};

PsicologoCards.propsType = {
  filtros: PropsType.object
}