import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import psicologo_img from "../component/perfil_componentes/psicologo.png";

export const Expedientes = () => {
  const { actions, store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  console.log(patients)

  
  useEffect(() => {
        
    const fetchData = async() =>{
      setIsLoading(true)
      
      try{
          const data = await actions.handle_patient_data();
          
      } catch (error) {
          console.error(error); // Handle any errors
        } finally {
          setIsLoading(false); // Finalizar la carga
      }

  }
  fetchData()
  }, []);

  useEffect(() => {
    setPatients(store.userPatients);
  }, [store.userPatients]);

  return (
    <>
      <div className="content-wrapper">
        <div>Expedientes</div>
      {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
        <div>
            <div className="row">
                  {patients.map((patient, index) => (
                  <div className="col-md-3">
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
                          {patient.name} {patient.last_name} {patient.id}
                      </h5>

                      <a href={`/Expedientes/${patient.id}`} className="btn btn-primary btn-block">
                          <b>perfil paciente</b>
                      </a>
                      </div>
                  </div>

                  </div>
                  ))}
            </div>
        </div>
        )}
      </div>
    </>
  );
};
