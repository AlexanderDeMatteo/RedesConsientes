import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import psicologo_img from "../component/perfil_componentes/psicologo.png";

export const Contactos = () => {
  const { actions, store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [psicologo, setPsicologo] = useState([]);

  
    console.log(psicologo)
  
  useEffect(() => {
        
    const fetchData = async() =>{
      setIsLoading(true)
      try{
          const data = await actions.get_psicologo_asigned();
          setPsicologo(store.userRelationShip)
      } catch (error) {
          console.error(error); // Handle any errors
        } finally {
          setIsLoading(false); // Finalizar la carga
      }

  }
  fetchData()
  }, []);


  return (
    <>
      <div className="content-wrapper">
        <h1>Contactos</h1>
      {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
        <div>
           {!store.userRelationShip.length == 0 ? <div className="row">
                  {psicologo.map((psico, index) => (
                  <div className="col-md-3" key={index}>
                  <div className="card card-primary card-outline">
                      <div>
                      <div className="text-center">
                          <img
                          src={
                              psicologo_img
                          }
                          alt="User profile picture"
                          id="avatar_perfil"
                          className="profile-user-img img-fluid img-circle"
                          />
                      </div>
                      <h5 className="my-3 text-center">
                          {psico.name} {psico.last_name}
                      </h5>

                      <a href={`/Perfil/${psico.id}`} className="btn btn-primary btn-block">
                          <b>Perfil Psicologo</b>
                      </a>
                      </div>
                  </div>

                  </div>
                  ))}
            </div> : "selecciona un psicologo"}
        </div>
        )}
      </div>
    </>
  );
};
