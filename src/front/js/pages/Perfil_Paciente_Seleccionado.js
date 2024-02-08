import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/pagina_principal.css";
import { useNavigate } from 'react-router-dom';
import psicologo_img from "../component/perfil_componentes/psicologo.png";
// import { Imagenes } from "../component/perfil_components/imagenes";
import { AboutMe } from "../component/perfil_componentes/AboutMe";
// import { uploadFile } from "../component/drag_and_drop";
import { useParams } from "react-router-dom";
import { TodoList } from "../component/todoList";

export const PerfilPacienteSeleccionado = () => {
    const API_URL = process.env.BACKEND_URL;
    const { id } = useParams();
    const { actions, store } = useContext(Context);
    const [selectedTab, setSelectedTab] = React.useState({
        li_0: { nav: "nav-link active", tab: "active tab-pane" },
        li_1: { nav: "nav-link", tab: "tab-pane" },
        li_2: { nav: "nav-link", tab: "tab-pane" },
    });

    function changeSelect(e) {
        const { name } = e.target;
        console.log(store);
        if (e.target.name && selectedTab[name].nav === "nav-link") {
          Object.filter = (obj, predicate) =>
            Object.keys(obj)
              .filter((key) => predicate(obj[key]))
              .reduce((res, key) => ((res[key] = obj[key]), res), {});
          let result = Object.filter(
            selectedTab,
            (score) => score.nav === "nav-link active"
          );
          let [firstKey] = Object.keys(result);
    
          setSelectedTab((prevSelected) => ({
            ...prevSelected,
            [name]: { nav: "nav-link active", tab: "active tab-pane" },
            [firstKey]: { nav: "nav-link", tab: "tab-pane" },
          }));
        } else if (e.target.name) {
          console.log("bbb");
          setSelectedTab((prevSelected) => ({
            ...prevSelected,
            [name]: { nav: "nav-link", tab: "tab-pane" },
          }));
        }
      }
    
    useEffect(() => {
        // actions.privateData()
        actions.handle_patient_data_seleccinado(id);
    }, []);

    return (

        <div>
        {store.userDataSelecionado.id == id ? ( 
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
                                           {`${store.userDataSelecionado.name} ${store.userDataSelecionado.last_name}`}
                                        </h5>
                                        <p className="text-muted mb-2 text-center">
                                            {store.userDataSelecionado.phone_number}
                                        </p>
                                        <p className="text-muted mb-2 text-center">
                                            {store.userDataSelecionado.email}
                                        </p>

                                    </div>



                                </div>
                                <AboutMe user_data={store.userDataSelecionado} />



                            </div>

                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills">
                                        <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_0"].nav}
                          name="li_0"
                          data-toggle="tab"
                        >
                          Información
                        </a>
                      </li>
                      <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_1"].nav}
                          name="li_1"
                          data-toggle="tab"
                        >
                          Motivo de Consulta
                        </a>
                      </li>
                      <li onClick={changeSelect} className="nav-item">
                        <a
                          className={selectedTab["li_2"].nav}
                          name="li_2"
                          data-toggle="tab"
                        >
                          Lista de Tareas
                        </a>
                      </li>

                                        </ul>
                                    </div>


                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className={selectedTab["li_0"]["tab"]} id="timeline">
                                                
                                                <div className="form-group row">
                                                    <label
                                                        for="inputName"
                                                        className="col-sm-2 "
                                                    >
                                                        Name
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <a className="text-muted mb-1">
                                                            {store.userDataSelecionado.name}
                                                        </a>
                                                    </div>       
                                                </div>

                                                <div className="form-group row">
                                                    <label
                                                        for="inputName"
                                                        className="col-sm-2 "
                                                    >
                                                        Name
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <a className="text-muted mb-1">
                                                            {store.userDataSelecionado.last_name}
                                                        </a>
                                                    </div>       
                                                </div>

                                                <div className="form-group row">
                                                    <label
                                                        for="inputName"
                                                        className="col-sm-2 "
                                                    >
                                                        Name
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <a className="text-muted mb-1">
                                                            {store.userDataSelecionado.dob}
                                                        </a>
                                                    </div>       
                                                </div>
                                                <div className="form-group row">
                                                    <label
                                                        for="inputName"
                                                        className="col-sm-2 "
                                                    >
                                                        Name
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <a className="text-muted mb-1">
                                                            {store.userDataSelecionado.email}
                                                        </a>
                                                    </div>       
                                                </div>
                                                <div className="form-group row">
                                                    <label
                                                        for="inputName"
                                                        className="col-sm-2 "
                                                    >
                                                        Name
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <a className="text-muted mb-1">
                                                            {store.userDataSelecionado.gender}
                                                        </a>
                                                    </div>       
                                                </div>
                                                <div className="form-group row">
                                                    <label
                                                        for="inputName"
                                                        className="col-sm-2 "
                                                    >
                                                        Name
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <a className="text-muted mb-1">
                                                            {store.userDataSelecionado.phone_number}
                                                        </a>
                                                    </div>       
                                                </div>
                                            </div>
                                            <div className={selectedTab["li_1"]["tab"]} id="timeline">
                                                
                                                <div className="form-group row">
                                                    <label
                                                        for="inputName"
                                                        className="col-sm-2 "
                                                    >
                                                        Motivo de consulta
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <a className="text-muted mb-1">
                                                            {store.userDataSelecionado.motivo_consulta}
                                                        </a>
                                                    </div>       
                                                </div>
                                            </div>
                                            <div className={selectedTab["li_2"]["tab"]} id="timeline">
                                            <h1>Lista de tareas para la proxima sesion</h1>
                                            <TodoList id={id}/>
                                            
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
    )
    : ("Paciente no disponible")}  
        </div >
);
};


