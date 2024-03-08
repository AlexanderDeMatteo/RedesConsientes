import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import "../../styles/panel.css"
import { useNavigate } from "react-router-dom";
import { checkPropTypes } from "prop-types";

export const Panel = () => {
    const [isLoading, setIsLoading] = useState("");
    const { actions, store } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(0);
    const psicologos = store.userPsicologostoaprove
    const [lista,setLista] = useState(psicologos)
    const [search, setSearch] = useState("")
    const [nameCheck, setNameCheck] = useState("")
    const [cedula, setCedula] = useState("")
    const [fpvNumber,setFpvNumber] = useState("")
    const [aproved,setAproved] = useState("todo")
    const navigate = useNavigate();

    console.log(aproved)

    const activar = (id) =>{
        actions.active_user(id)
        console.log(id)
    }

    const deleteUser = (id) =>{
        actions.delete_psicologo(id)
        alert("usuario eliminado")
        actions.handle_user_psicologo_to_aprove()
    }

    const handleSelected = e =>{
        setAproved(e.target.value)
    }

    const checkcedula = (value) =>{
        if(cedula == value){
            return setCedula(false)
        }
        setCedula(value)
    }

    const checkFpv_number = (value) =>{
        if(fpvNumber == value){
            return setFpvNumber(false)
        }
        setFpvNumber(value)
    }


    const info = (id) =>{
        navigate(`/perfil/${id}`);
    }
    
    const filtredPsicologos = () => {
        if(search.length === 0){
            return psicologos.slice(currentPage,currentPage+10)
        }
        if(cedula == "cedula"){
            const cedulaFiltred = psicologos.filter(psicologo => psicologo?.cedula?.includes(search))
            return cedulaFiltred.slice(currentPage,currentPage +10)
        }
        if(fpvNumber == "fpv_number"){
            const fpvFiltred = psicologos.filter(psicologo => psicologo?.fpv_number?.includes(search))
            return fpvFiltred.slice(currentPage,currentPage +10)
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


    // useEffect(() => {
    //     filtredPsicologos()
    // }, [psicologos, search, cedula, fpvNumber, aproved]);


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
      }, [lista]);

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
                    <div id="check-box" className="d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="mb-2 form control"
                            name="name"
                            value="name"
                            id="name"
                            
                        />
                        <label for="name" className="mr-2">Nombre</label>
                        <input
                            type="checkbox"
                            className="mb-2 form control"
                            name="cedula"
                            value="cedula"
                            id="cedula"
                            onClick={() => checkcedula("cedula")}
                        />
                        <label for="cedula" className="mr-2">Cedula</label>
                        <input
                            type="checkbox"
                            className="mb-2 form control"
                            name="fpv_number"
                            value="fpv_number"
                            id="fpv_number"
                            onClick={() => checkFpv_number("fpv_number")}
                        />
                        <label for="fpv_number" className="mr-2">Numero de fpv</label>
                        <label for="validationCustom04" className="form-label">Aprobado</label>
                        <select class="form-select col-md-2"
                                id="validationCustom04" 
                                required
                                value={aproved}
                                onChange={(event) => setAproved(event.target.value)}
                                >
                        <option selected disabled value="">selecciona</option>
                        <option>todo</option>
                        <option>aprobado</option>
                        <option>pendiente</option>
                        </select>
                       
                       
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
                            <td>{psicologo.is_active == true ? "si" : "pendiente"}</td>
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
            
            </div>)}
            
        </>


    )
}