import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/pagina_principal.css";
import {Tabs, Tab, Chip} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Avatar, Image, Button} from "@nextui-org/react";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
// import { Imagenes } from "../component/perfil_components/imagenes";
import { AboutMe } from "../component/perfil_componentes/AboutMe";
// import { uploadFile } from "../component/drag_and_drop";
import { useParams } from "react-router-dom";
import { InfoTab } from "../component/perfil_componentes/tabs profile/InfoTab";
import { Calendar_Psicologo } from "./Calendar_Psicologo";
import { Cursos } from "./Cursos";
import { HomeWork } from "../component/perfil_componentes/tabs profile/HomeWork";
import { ProfileTab } from "../component/perfil_componentes/tabs profile/ProfileTab";


export const PerfilPacienteSeleccionado = () => {
    const API_URL = process.env.BACKEND_URL;
    const { id } = useParams();
    const { actions, store } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    

    useEffect(() => {
        
      const fetchData = async() =>{
        setIsLoading(true)
        
        try{
            const data = await actions.handle_patient_data_seleccinado(id);
            console.log(data, "data")
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
                        <Avatar isBordered className="w-40 h-40"  color="primary" src={store.userDataSelecionado.profile_picture
                                ? store.userDataSelecionado.profile_picture
                                : psicologo_img} />
                        </CardHeader>
                      <CardBody className="overflow-visible py-2 text-center">
                        <p className="text-tiny uppercase font-bold">{store.userDataSelecionado.name} {store.userDataSelecionado.last_name}</p>
                      </CardBody>
                    </Card>

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
                                key="cursos_realizados"
                                title={
                                    <div className="flex items-center space-x-2">
                                    <i class="fa-regular fa-user"></i>
                                    <span>Perfil</span>
                                    {/* <Chip size="sm" variant="faded">1</Chip> */}
                                    </div>
                                }
                                >
                                <Card>
                                    <CardBody>
                                        <ProfileTab user_data={store.userDataSelecionado}/>
                                    </CardBody>
                                </Card>     
                                </Tab>
                                <Tab
                                key="Tareas"
                                title={
                                    <div className="flex items-center space-x-2">
                                    <i class="fa-solid fa-book"></i>
                                    <span>Tareas</span>
                                    {/* <Chip size="sm" variant="faded">1</Chip> */}
                                    </div>
                                }
                                >
                                <Card>
                                    <CardBody>
                                        <HomeWork/>
                                    </CardBody>
                                </Card>     
                                </Tab>
                                <Tab
                                key="Notas sobre paciente"
                                title={
                                    <div className="flex items-center space-x-2">
                                    <i class="fa-solid fa-book"></i>
                                    <span>Notas sobre paciente</span>
                                    {/* <Chip size="sm" variant="faded">1</Chip> */}
                                    </div>
                                }
                                >
                                <Card>
                                    <CardBody>
                                        <HomeWork/>
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


