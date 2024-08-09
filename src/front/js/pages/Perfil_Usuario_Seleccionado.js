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
    const [isSelected, setIsSelected] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [contenidoBoton,setContenidoBoton] = useState("")
    const [selectedTab, setSelectedTab] = React.useState({
        li_0: { nav: "nav-link active", tab: "active tab-pane" },
        li_1: { nav: "nav-link active", tab: "active tab-pane" },
    });
    
    const enlace = (id) =>  {
      const selected_psicologo_id = store.userData.selected_psicologo_id
      actions.Psicology_selected(id)
      if(isSelected == true && selected_psicologo_id == id){
      setIsSelected(false)
      console.log("soy yo 1")
      setContenidoBoton("Seleccionar Psicologo")
      }else if(isSelected == true && contenidoBoton == "Deseleccionar Psicologo"){
        setIsSelected(false)
        console.log("soy yo 2")
        setContenidoBoton("Seleccionar Psicologo")
      }else if(isSelected == true && selected_psicologo_id != id ){
      setIsSelected(true)
      console.log("soy yo 2")
      setContenidoBoton("Deseleccionar Psicologo")
      }else if (isSelected == false){
        setIsSelected(true)
        console.log("soy yo 3")
        setContenidoBoton("Deseleccionar Psicologo")
      }else{
      setIsSelected(false)
      console.log("soy yo 4")
      setContenidoBoton("Seleccionar Psicologo")
      }
    }

    useEffect(() => {
      const fetchData = async() =>{
        setIsLoading(true)
        try{
            const data = await actions.handle_user_data_seleccinado(id);
            const data2 = await actions.handle_user_data();
            console.log((store.userData.is_psicologo_selected == true && store.userData.selected_psicologo_id == id ))
            console.log(store.userData.is_psicologo_selected)
            if(store.userData.is_psicologo_selected && store.userData.selected_psicologo_id == id ){
              setIsSelected(true)
              setContenidoBoton("Deseleccionar Psicologo")
            }
            else if(store.userData.is_psicologo_selected == true){
              setIsSelected(true)
              setContenidoBoton("Cambiar de Psicologo")}
            else{
              setIsSelected(false)
              setContenidoBoton("Seleccionar Psicologo")
            }

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
                        <p className="text-tiny uppercase font-bold">{store.userDataSelecionado.id} {store.userDataSelecionado.last_name}</p>
                        <small className="text-default-500">{store.userDataSelecionado.area_de_especialidad}</small>
                        <h4>N°FPV:{store.userDataSelecionado.fpv_number}</h4>
                        <h4 className="font-bold text-large">Precio de la consulta {store.userDataSelecionado.monto_consulta}$</h4>
                      </CardBody>
                      <Button color="primary" variant={isSelected ? "solid" : "ghost"} onClick={() => enlace(id)}>
                        {/* {isSelected ? "Cambiar de psicologo" : "Seleccionar psicologo"} */}
                        {contenidoBoton}
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


