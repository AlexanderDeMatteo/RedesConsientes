import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import "../../styles/panel.css"


export const Panel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { actions, store } = useContext(Context);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const psicologos = store.userPsicologostoaprove
    
    console.log(psicologos)
    const activar = (id) =>{
        actions.active_user(id)
        console.log(id)
    }

    const deleteUser = (id) =>{
        actions.delete_patient(id)
    }

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

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
                <div className="App">
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>cedula</th>
                    <th>Numero de federado</th>
                    <th>Aprobado</th>
                    <th>acciones</th>

                </tr>
                {psicologos.map((psicologo, key) => {
                    return (
                        <tr key={key}>
                            <td>{psicologo.name} {psicologo.last_name}</td>
                            <td>{psicologo.cedula}</td>
                            <td>{psicologo.fpv_number}</td>
                            <td>{psicologo.is_active == true ? "si" : "no"}</td>
                            <td>{psicologo.is_active ==true ? (" ") : (<i class="fa-solid fa-check" onClick={() => activar(psicologo.id)}></i>)} <i class="fa-solid fa-trash" onClick={() => deleteUser(psicologo.id)}></i></td>
                        </tr>
                    )
                })}
            </table>
        </div>
                {/* <div className="row">
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
          </div> */}

            </div>)}
            
        </>


    )
}