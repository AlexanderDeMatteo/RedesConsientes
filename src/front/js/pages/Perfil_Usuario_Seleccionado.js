import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/pagina_principal.css";
import Imager from "../component/perfil_componentes/consulta.jpg";
import Imager1 from "../component/perfil_componentes/consulta2.jpg";
import Imager2 from "../component/perfil_componentes/consulta3.jpeg";
import Imager3 from "../component/perfil_componentes/consulta3.jpeg";
import Imager4 from "../component/perfil_componentes/consulta4.jpg";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import { useNavigate } from "react-router-dom";
// import { Imagenes } from "../component/perfil_components/imagenes";
import { AboutMe } from "../component/perfil_componentes/AboutMe";
// import { uploadFile } from "../component/drag_and_drop";
import { useParams } from "react-router-dom";

import { MetodosDePagoPaciente } from "./Metodos_De_Pago_Paciente";


export const PerfilUsuarioSeleccionado = () => {
    const API_URL = process.env.BACKEND_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);
    const [isSelected, setIsSelected] = useState(false)
    console.log("aaaaaaaaaaa", store.userDataSelecionado)
    const [selectedTab, setSelectedTab] = React.useState({
        li_0: { nav: "nav-link active", tab: "active tab-pane" },
        li_1: { nav: "nav-link active", tab: "active tab-pane" },
    });


    const enlace = (id) => {
        actions.Psicology_selected(id)
        if(isSelected == false){
            setIsSelected(true)
            alert("psicologo seleccionado con exito")
        }else{
            setIsSelected(false)
            alert("psicologo desseleccionado con exito")
        }
    }

    const handleClick = () =>{
        navigate(`/calendar/${id}`)
    }

    useEffect(() => {
        // actions.privateData()
        actions.handle_user_data_seleccinado(id);
    }, []);



    // let pepe = store.userDataSelecionado 
    // console.log(pepe)
    // const perfilSeleccionado = pepe.filter(usuario => usuario.edad)
    // console.log("aaaaaaaa", perfilSeleccionado)

    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Perfil</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card card-primary card-outline">
                                    <div >
                                        <div className="text-center">
                                            <img
                                                src={
                                                    store.userDataSelecionado.profile_picture
                                                        ? store.userDataSelecionado.profile_picture
                                                        : psicologo_img
                                                }
                                                alt="User profile picture"
                                                id="avatar_perfil"
                                                className="profile-user-img img-fluid img-circle"
                                            />
                                        </div>
                                        <h5 className="my-3 text-center">
                                            {store.userDataSelecionado.name}
                                        </h5>
                                        <p className="text-muted mb-1 text-center">
                                            {store.userDataSelecionado.area_de_especialidad}
                                        </p>
                                        <p className="text-muted mb-2 text-center">
                                            {store.userDataSelecionado.phone_number}
                                        </p>
                                        <p className="text-muted mb-2 text-center">
                                            {store.userDataSelecionado.email}
                                        </p>


                                      {!store.userData.is_psicologo ? (
                                        <a
                                            href="#"
                                            className={`btn ${isSelected ? 'btn btn-success btn-block'  : 'btn btn-primary btn-block'}`}
                                            onClick={() => enlace(id)}
                                        >
                                            {isSelected ? 'Psicologo seleccionado' : 'Seleccionar psicologo'}
                                        </a>
                                      ) : ("") }    

                                    </div>



                                </div>
                                <AboutMe user_data={store.userDataSelecionado} />



                            </div>

                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2 ">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item mr-2">
                                                <a
                                                    className={selectedTab["li_0"].nav}
                                                    name="li_0"
                                                    data-toggle="tab"
                                                >
                                                    Información
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a
                                                    className={selectedTab["li_1"].nav}
                                                    name="li_1"
                                                    data-toggle="tab"
                                                    onClick={handleClick}
                                                >
                                                    Calendario
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className={selectedTab["li_0"]["tab"]} id="timeline">
                                                <div className="post clearfix">
                                                    <div className="user-block">
                                                        {/* <span className="username"> */}
                                                        <strong>

                                                            <a >Estrategia Terapeutica o enfoque terapeutico</a>
                                                        </strong>
                                                        {/* <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a> */}
                                                        {/* </span> */}

                                                    </div>
                                                    <p>
                                                        {store.userDataSelecionado.psych_strategies}
                                                    </p>


                                                </div>


                                                <div className="post">
                                                    <div className="user-block">
                                                        {/* <span className="username"> */}
                                                        <strong>

                                                            <a >Experiencias</a>
                                                        </strong>
                                                        {/* <a href="#" className="float-right btn-tool"><i className="fas fa-times"></i></a> */}
                                                        {/* </span> */}

                                                    </div>

                                                    <div className="row mb-3">
                                                        <div className="col-sm-6">
                                                            <img className="img-fluid" src={Imager} alt="Photo" />
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <img className="img-fluid mb-3" src={Imager1} alt="Photo" />
                                                                    <img className="img-fluid mb-3" src={Imager2} alt="Photo" />
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <img className="img-fluid mb-3" src={Imager3} alt="Photo" />
                                                                    <img className="img-fluid mb-3" src={Imager4} alt="Photo" />
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                    <p>
                                                        {store.userDataSelecionado.PsychExperiences
                                                        }
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <MetodosDePagoPaciente psicologoID={id}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    );
};


