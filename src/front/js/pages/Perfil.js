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
import {Card, CardHeader, CardBody, Avatar, Image, Button} from "@nextui-org/react";
import { Panel } from "./panel";
import { Imagenes2 } from "../component/perfil_componentes/imagenes2";
import { ProfileTabs } from "../component/perfil_componentes/profileTabs";

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
                    {store.userData.role_id == 2 ?
                    <AboutMe user_data={store.userData} />
                  : ""}
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


