import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/pagina_principal.css";
import { Imagenes2 } from "../component/perfil_componentes/imagenes2";
import {Tabs, Tab, Chip} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Avatar, Image, Button} from "@nextui-org/react";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import { useNavigate } from "react-router-dom";
// import { Imagenes } from "../component/perfil_components/imagenes";
import { AboutMe } from "../component/perfil_componentes/AboutMe";
// import { uploadFile } from "../component/drag_and_drop";
import { useParams } from "react-router-dom";

import { MetodosDePagoPaciente } from "./Metodos_De_Pago_Paciente";
import { InfoTab } from "../component/perfil_componentes/tabs profile/InfoTab";
import { HomeWork } from "../component/perfil_componentes/tabs profile/HomeWork";
import Calendar from "react-calendar";
import { Calendar_custom } from "./Calendar";
import { Calendar_Psicologo } from "./Calendar_Psicologo";
import { Cursos } from "./Cursos";


export const PerfilUsuarioSeleccionado = () => {
    const API_URL = process.env.BACKEND_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);
    const [isSelected, setIsSelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = React.useState({
        li_0: { nav: "nav-link active", tab: "active tab-pane" },
        li_1: { nav: "nav-link active", tab: "active tab-pane" },
    });
    
    const enlace = async (id) => {
      try {
          await actions.Psicology_selected(id);
          setIsSelected(!isSelected); // Invierte el estado directamente
          alert(`Psicólogo ${isSelected ? 'seleccionado' : 'deseleccionado'} con éxito`);
      } catch (error) {
          console.error('Error al seleccionar al psicólogo:', error);
          // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje de error al usuario
      }
  };
    useEffect(() => {
        // actions.privateData()
        actions.handle_user_data_seleccinado(id);
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
                        <Avatar isBordered className="w-40 h-40"  color="primary" src={store.userDataSelecionado.profile_picture
                                ? store.userDataSelecionado.profile_picture
                                : psicologo_img} />
                        </CardHeader>
                      <CardBody className="overflow-visible py-2 text-center">
                        <p className="text-tiny uppercase font-bold">{store.userDataSelecionado.id} {store.userDataSelecionado.last_name}</p>
                        <small className="text-default-500">{store.userDataSelecionado.area_de_especialidad}</small>
                        <h4>N°FPV:{store.userDataSelecionado.fpv_number}</h4>
                        <h4 className="font-bold text-large">Precio de la consulta {store.userDataSelecionado.monto_consulta}$</h4>
                      </CardBody>
                      <Button color="primary" variant="ghost" onClick={enlace}>
                        Seleccionar psicologo
                      </Button> 
                    </Card>

                    <AboutMe user_data={store.userDataSelecionado} />
                  </div>
                  <div className="col-md-9">
                    <div className="flex w-full flex-col">
                    <Tabs 
                            aria-label="Options" 
                            color="primary" 
                            variant="underlined"
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-small p-3 border-b border-divider bg-white",
                                cursor: "w-full bg-[#22d3ee]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                            
                        }}
                        >
                            <Tab
                                className=""
                                key="informacion"
                                title={
                                    <div className="flex items-center space-x-2">
                                    <i class="fa-solid fa-brain"></i>
                                    <span>Informacion</span>
                                    {/* <Chip size="sm" variant="faded">0</Chip> */}
                                    </div>
                                }
                                >
                                <Card>
                                    <CardBody>
                                        <InfoTab id={id} user_data={store.userDataSelecionado}/>
                                    </CardBody>
                                </Card>  
                                </Tab>
                                <Tab
                                key="Calendary"
                                title={
                                    <div className="flex items-center space-x-2">
                                    <i class="fa-regular fa-calendar-days"></i>
                                    <span>Calendario</span>
                                    {/* <Chip size="sm" variant="faded">1</Chip> */}
                                    </div>
                                }
                                >
                                <Card>
                                    <CardBody>
                                        <Calendar_Psicologo/>
                                    </CardBody>
                                </Card>     
                                </Tab>
                                <Tab
                                key="cursos_realizados"
                                title={
                                    <div className="flex items-center space-x-2">
                                    <i class="fa-solid fa-graduation-cap"></i>
                                    <span>Cursos Realizados</span>
                                    {/* <Chip size="sm" variant="faded">1</Chip> */}
                                    </div>
                                }
                                >
                                <Card>
                                    <CardBody>
                                        <Cursos/>
                                    </CardBody>
                                </Card>     
                                </Tab>
                        </Tabs>
                    </div>
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


