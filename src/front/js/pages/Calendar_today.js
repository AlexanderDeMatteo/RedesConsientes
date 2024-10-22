import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_today.css"
import { Context } from "../store/appContext.js";
import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";
import { useParams } from "react-router-dom";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import Calendar from 'react-calendar';
import "../../styles/jumbotron.css"
import { PsicologoCard } from "../component/calendar_components/PsicologoCard.js";
import { ClientCard, clientCard } from "../component/calendar_components/clientCard.js";
// import { useParams } from "react-router-dom";


export const CalendarToday_custom = () => {
    const { actions, store } = useContext(Context)
    const [selectedDate, setSelectedDate] = useState(new Date().toString().split(" "));
    const [isLoading, setIsLoading] = useState(false);
    const [fecha, setFecha] = useState(`${selectedDate[0]}, ${selectedDate[2]} ${selectedDate[1]} ${selectedDate[3]}`)
    // const {id} = useParams()
    const {id} = useParams()
    
    const transition = useTransition(store.scheduleSession, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },

    });
//    

console.log(store.scheduleSession)

function to12HourFormat(time24h) {
    if (typeof time24h === 'undefined') {
        time24h = ""; // Establece un valor por defecto como una cadena vacía
      }
    // Divide la cadena de tiempo en horas y minutos
    const [hours, minutes] = time24h.split(":");
  
    // Convierte las horas a un número entero
    const hourInt = parseInt(hours);
  
    // Determina el indicador AM/PM
    const amPm = hourInt >= 12 ? "PM" : "AM";
  
    // Ajusta las horas para el formato de 12 horas
    let hour12 = hourInt % 12;
  
    // Maneja el caso especial de las 12 en punto
    hour12 = hour12 === 0 ? 12 : hour12;
  
    // Formatea la hora con padding de ceros y agrega los minutos y AM/PM
    return `${hour12.toString().padStart(2, "0")}:${minutes} ${amPm}`;
  }
  

    const phrase = store.phrase


    useEffect(() => {
        const fetchData = async() =>{
            setIsLoading(true)
            try{
                const data = await actions.handle_user_data()
                if(store.userData.is_psicologo == false){
                    const clientdate = await actions.getClientScheduleReservedDay(id, fecha)
                    // const psicologo = await actions.getPsicologiScheduleReservedDay(id, fecha)
                    const frase = await actions.get_phrase()
                    return true
                }
                const clientdate = await actions.getPsicologiScheduleReservedDay(id, fecha)
                // const clientdate2 = await actions.getClientScheduleReservedDay(id, fecha)
                // const psicologodate = await actions.getPsicologiScheduleReservedDay(id, fecha)
                const frase = await actions.get_phrase()
            } catch (error) {
                console.error(error); // Handle any errors
              } finally {
                setIsLoading(false); // Finalizar la carga
            }

        }
        fetchData()

    }, [])
    
    console.log(store.scheduleSession)
   
    return (
        <>

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Citas de Hoy</h1>
                            </div>
                        </div>
                    </div>
                </section>
                {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
               

                    <div className="">
                        <section className="max-w-[100%] gap-2 grid grid-cols-12 grid-rows-2 px-8">
                           {store.scheduleSession.length == 0  ? ( 
                           <div className="w-full h-[300px] col-span-12 sm:col-span-6">
                                
                            <Card className="max-w-[400px]">
                            <CardHeader className="flex gap-3 " id="card">
                                <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                                />
                                <div className="flex flex-col">
                                <p className="text-md">Citas para hoy</p>
                                </div>
                            </CardHeader>
                            <Divider/>
                            <CardBody>
                                <p>No hay sesiones para el dia de hoy</p>
                            </CardBody>
                            <Divider/>
                            </Card>
                                        
                                    

                            </div>):(<div className="w-full h-[300px] col-span-12 sm:col-span-6">
                                {transition((style, item) =>
                                    item ? <animated.div style={style} className="" >
                                        <>
                                        {item.psychologist_session_id == id ? 
                                        <PsicologoCard item={item} id={id}/> : <ClientCard id={id} item={item}/>}
                                        
                                            
                                        </>
                                        </animated.div> : '')}

                            </div>)}
                            
                            <div className="w-full h-[300px] col-span-12 sm:col-span-6 ">
                                
                                    {phrase.length == 0 ? (
                                                <Card className="max-w-[400px]">
                                            <CardHeader className="flex gap-3" id="card">
                                                <div className="flex flex-col">
                                                <p className="text-md">Frase del Dia</p>
                                                </div>
                                            </CardHeader>
                                            <Divider/>
                                            <CardBody>
                                            <p>no hay frase el dia de hoy</p> 
                                            </CardBody>
                                            <Divider/>
                                            </Card>
                                            ) : (
                                            phrase.map((item, index) => 
                                            <>
                                                <Card className="max-w-[400px] mt-1">
                                            <CardHeader className="flex gap-3" id="card">
                                                <div className="flex flex-col">
                                                <p className="text-md">Frase del dia</p>
                                                </div>
                                            </CardHeader>
                                            <Divider/>
                                            <CardBody>
                                            <p>{item.phrase}</p>
                                            <p>- {item.author}.</p>
                                            </CardBody>
                                            <Divider/>
                                            </Card>
                                            </>
                                            )
                                             )
                                        } 
                                        
                                   

                            </div>
                        </section>
                    </div>
                )}


            </div>
        </>
    )
}
