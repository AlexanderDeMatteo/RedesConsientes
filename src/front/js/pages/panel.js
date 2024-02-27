import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import psicologo_img from "../component/perfil_componentes/psicologo.png";



export const Panel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { actions, store } = useContext(Context);
    
    const psicologos = store.userPsicologostoaprove
    
    console.log(psicologos)
    const activar = (id) =>{
        actions.active_user(id)
        console.log(id)
    }

    const deleteUser = (id) =>{
        actions.delete_patient(id)
    }

    useEffect(() => {
        
        const fetchData = async() =>{
          setIsLoading(true)
          
          try{
              const data = await actions.handle_user_psicologo_to_aprove();
              
          } catch (error) {
              console.error(error); // Handle any errors
            } finally {
              setIsLoading(false); // Finalizar la carga
          }
    
      }
      fetchData()
    
        actions.handle_user_data();
      }, []);


    return(

        <>
            <h1>Panel de control</h1>
            {isLoading == true ? (<div className="d-flex justify-content-center"><div class="spinner-border text-primary m-5" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div></div>) : (
            <div>
                <div>
                    <h1>solicitudes</h1>
                </div>
                <div className="row">
                {psicologos.map((psicologo, index) => (
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
                    <ul>
                        <li>
                            Nombre: {psicologo.name} 
                        </li>
                        <li>
                            Apellido: {psicologo.last_name} 
                        </li>
                        <li>
                            Numero de FPV: {psicologo.fpv_number} 
                        </li>
                        <li>
                            Cedula: {psicologo.cedula}
                        </li>
                    </ul>
                    <div className="row">
                        <a className="btn btn-success btn-block" onClick={() => activar(psicologo.id)}>
                            <b>Aprobado</b>
                        </a>
                        <a className="btn btn-danger btn-block" onClick={() => deleteUser(psicologo.id)}>
                            <b>Rechazado</b>
                        </a>

                    </div>
                    </div>
                </div>

                </div>
                ))}
          </div>

            </div>)}
            
        </>


    )
}