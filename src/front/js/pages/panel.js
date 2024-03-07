import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import "../../styles/panel.css"
import { useNavigate } from "react-router-dom";

export const Panel = () => {
    const [isLoading, setIsLoading] = useState("");
    const { actions, store } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(0);
    const psicologos = store.userPsicologostoaprove
    const [search, setSearch] = useState("")
    const [nameCheck, setNameCheck] = useState()
    const navigate = useNavigate();
  
    console.log(nameCheck)

    const activar = (id) =>{
        actions.active_user(id)
        console.log(id)
    }

    const deleteUser = (id) =>{
        actions.delete_patient(id)
    }

    const handleOnCheckbox = e =>{
        setNameCheck(e.target.value)
    }

    const info = (id) =>{
        navigate(`/perfil/${id}`);
    }
    
    const filtredPsicologos = () => {
        if(search.length === 0){
            return psicologos.slice(currentPage,currentPage+10)
        }
        const filtred = psicologos.filter(psicologo => psicologo.name.includes(search))
        return filtred.slice(currentPage,currentPage +10)
    }
   
    const nextPage = () =>{
        setCurrentPage(currentPage + 10)
    }
    
    const prevPage = () =>{
        setCurrentPage(currentPage - 10)
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
      }, []);

    return(

        <>
            <h1 id="titulo">Panel de control</h1>
            {isLoading == true ? (<div className="d-flex justify-content-center"><div class="spinner-border text-primary m-5" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div></div>) : (
            <div>
                    <h1>solicitudes</h1>
                <div>
                    <input
                        type="text"
                        className="mb-2 form control"
                        placeholder="Buscador"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <div id="check-box">
                        <input
                            type="checkbox"
                            className="mb-2 form control"
                            name="name"
                            value="name"
                            id="name"
                            onChange={(event) => setNameCheck(event.target.value)}
                        />
                        <label for="name">Nombre</label>
                        <input
                            type="checkbox"
                            className="mb-2 form control"
                            name="cedula"
                            value="cedula"
                            id="cedula"
                            onChange={handleOnCheckbox}
                        />
                        <label for="cedula">Cedula</label>
                        <input
                            type="checkbox"
                            className="mb-2 form control"
                            name="fpv_number"
                            value="fpv_number"
                            id="fpv_number"
                            onChange={handleOnCheckbox}
                        />
                        <label for="fpv_number">Numero de fpv</label>
                        <input
                            type="checkbox"
                            className="mb-2 form control"
                            name="aprobado"
                            value="aprobado"
                            id="aprobado"
                            onChange={handleOnCheckbox}
                        />
                        <label for="aprobado">Aprobado</label>
                    </div>
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
                {filtredPsicologos().map((psicologo, key) => {
                    return (
                        <tr key={key}>
                            <td>{psicologo.name} {psicologo.last_name}</td>
                            <td>{psicologo.cedula}</td>
                            <td>{psicologo.fpv_number}</td>
                            <td>{psicologo.is_active == true ? "si" : "no"}</td>
                            <td>{psicologo.is_active ==true ? (" ") : (<i id="panelIcon" class="fa-solid fa-check" onClick={() => activar(psicologo.id)}></i>)} <i id="panelIcon" class="fa-solid fa-trash" onClick={() => deleteUser(psicologo.id)}></i> <i id="panelIcon" class="fa-solid fa-circle-info" onClick={() => info(psicologo.id)}></i></td>
                        </tr>
                    )
                })}
            </table>
                <button className="btn btn-primary"
                        onClick={prevPage}>Anterior</button>
                &nbsp;
                <button className="btn btn-primary"
                        onClick={nextPage}>Siguente</button>

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