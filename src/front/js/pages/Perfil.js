import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/pagina_principal.css";
import Imager from "../component/perfil_componentes/consulta.jpg";
import Imager1 from "../component/perfil_componentes/consulta2.jpg";
import Imager3 from "../component/perfil_componentes/consulta3.jpeg";
import Imager4 from "../component/perfil_componentes/consulta4.jpg";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import { Imagenes } from "../component/perfil_componentes/Imagenes";
import { AboutMe } from "../component/perfil_componentes/AboutMe";
import { useNavigate } from 'react-router-dom';
import { TodoList } from "../component/todoList";
import { TodoListPaciente } from "../component/todoListpaciente";
import {Card, CardHeader, CardBody, Avatar, Image, Button} from "@nextui-org/react";
import { Panel } from "./panel";
import { Imagenes2 } from "../component/perfil_componentes/imagenes2";
import { ProfileTabs } from "../component/perfil_componentes/profileTabs";
// import { uploadFile } from "../component/drag_and_drop";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const Perfil = () => {
  const API_URL = process.env.BACKEND_URL;
  const [show, setShow] = useState(true);
  const [lista, setLista] = useState({
    la_lista: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [profileUser, setProfile] = useState({});
  const [modal, setmodal] = useState();
  const navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [selectedTab, setSelectedTab] = React.useState({
    li_0: { nav: "nav-link active", tab: "active tab-pane" },
    li_1: { nav: "nav-link", tab: "tab-pane" },
    li_2: { nav: "nav-link", tab: "tab-pane" },
    li_3: { nav: "nav-link", tab: "tab-pane" },
    li_4: { nav: "nav-link", tab: "tab-pane" },
    li_5: { nav: "nav-link", tab: "tab-pane" },
  });

  useEffect(() => {
    const fetchData = async() =>{
      setIsLoading(true)
      try{
          const data = await actions.handle_user_data();

      } catch (error) {
          console.error(error); // Handle any errors
        } finally {
          setIsLoading(false); // Finalizar la carga
      }

  }
  fetchData()

  }, []);

  function changeSelect(e) {
    const { name } = e.target;
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
      setSelectedTab((prevSelected) => ({
        ...prevSelected,
        [name]: { nav: "nav-link", tab: "tab-pane" },
      }));
    }
  }

  function handleModal() {
    show.modal;
  }

  function Editar() {
    if (!show) {
      guardar();
    }
    setShow((wasShow) => !wasShow);
  }


  function handleChange(event) {
   
    actions.handle_edit(event.target.value, event.target.name);
    
  }

  

  const onDeleter = (e, value) => {
    e.preventDefault();
    let element = lista.la_lista.filter((name) => name !== value);
    setLista((prevLista) => {
      return {
        la_lista: element,
      };
    });
  };

  

  const guardar = async () => {

    const response = await fetch(`${API_URL}/api/user-profile`, {
      method: "PUT",
      body: JSON.stringify(store.userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {

      alert("datos actualizados");
      // actions.handle_user_data();
    }
  };




  function handleSelect(event, value) {
  
    let vistaPsicologo = lista.la_lista;
    if (value != null) {
      vistaPsicologo.push({ title: value.title });
      setLista((prevLista) => {
        return {
          la_lista: vistaPsicologo,
        };
      });
    }
  }

  return (

    <>
       {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
      <div>
        <>
        

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
                   <Card className="pt-4 mb-4">
                     <CardHeader className="pb-0 pt-2 px-4 flex-col col-md-auto">
                        <Avatar isBordered className="w-40 h-40"  color="primary" src={store.userData.profile_picture
                                ? store.userData.profile_picture
                                : psicologo_img} />
                        </CardHeader>
                      <CardBody className="overflow-visible py-2 text-center">
                        <p className="text-tiny uppercase font-bold">{store.userData.name} {store.userData.last_name}</p>
                        <small className="text-default-500">{store.userData.area_de_especialidad}</small>
                        <h4 className="font-bold text-large">{store.userData.email}</h4>
                        <div className="text-center">
                          <Imagenes2 />
                        </div>
                      </CardBody>
                      <Button color="primary" variant="ghost">
                        Seleccionar psicologo
                      </Button> 
                    </Card>

                    <AboutMe user_data={store.userData} />
                  </div>
                  <div className="col-md-9">
                    <ProfileTabs/>
                  </div>
                </div>
              </div>
            </section>
          </div >
        
        </>
      </div >)}
    </>
  );
};


