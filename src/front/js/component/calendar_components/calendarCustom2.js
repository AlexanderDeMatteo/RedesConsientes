
import React, { useState, useContext, useEffect, useRef } from "react";
// import "../../styles/custom_calendar_config.css"
import { Context } from "../../store/appContext.js";
import { useParams } from "react-router-dom";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import { useTransition, animated } from "react-spring";
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import {Card, CardHeader, CardBody, Avatar, Image} from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import "../../../styles/calendar/calendarCustom2.css"


export const CalendarCustom2 = ({calendar_date2, calendar_date, fecha}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { actions, store } = useContext(Context)
    const [showcreate, setShowCreate] = useState(false);
    const [DatesCreate, setDatesCreate] = useState({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' });
    const {id} = useParams(0)
    const [timeInicio, setTimeInicio] = useState("12:00");
    const [amPmInicio, setAmPmInicio] = useState("");
    const [timeFinal, setTimeFinal] = useState("12:00");
    const [amPmFinal, setAmPmFinal] = useState("");
    const [isLoading, setIsLoading] = useState("");

    

    const transition = useTransition(store.scheduleSession, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
    });
    const transition_2 = useTransition(showcreate, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        leave: { x: 0, y: 50, opacity: 0 },
    });

    useEffect(() => {
        actions.getPsicologiScheduleDay(id, fecha)

    }, [fecha])

    useEffect(()=>{
     
    },[timeInicio])
    
    useEffect(() => {
        
        const fetchData = async() =>{
          setIsLoading(true)
          
          try{
              const data = await actions.getPsicologiScheduleDay(id, fecha)
            
        } catch (error) {
              console.error(error); // Handle any errors
            } finally {
              setIsLoading(false); // Finalizar la carga
        }
    
      }
      fetchData()
      }, [fecha]);


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

      async function onCreatetimework(event) {
        event.preventDefault();
        let elemento1 = parseInt(timeInicio.replace(":","" ))
        let elemento2 = parseInt(timeFinal.replace(":","" ))
        let duracionMin= 45
        let durationTime = elemento2 - elemento1
        let schedule = store.scheduleSession
            if(elemento2 >= elemento1 && elemento2 >= (elemento1 + duracionMin)){
                let filterStartTime = schedule.filter(schedule => {
                    const scheduleStartTime = Number(schedule.start_time.replace(":", "").replace("PM", ""));
                    const scheduleEndTime = Number(schedule.end_time.replace(":", "").replace("PM", ""))
                    let orden = `${scheduleStartTime} ${scheduleEndTime}`
                    const statusInicio = elemento1 < scheduleStartTime || elemento1 > scheduleEndTime
                    const statusFinal = elemento2 > scheduleEndTime || elemento2 < scheduleStartTime
                        if(statusInicio == false && statusFinal == false){
                            alert("el horario no esta disponible, verifica ambas horas")
                            return true
                        }
                        else if(statusInicio == false){
                            alert("el horario no esta disponible, verificar la hora de inicio")

                        return true
                        }
                        else if(statusFinal == false){
                            alert("el horario no esta disponible, verificar la hora final")
                            statusInicio == false
                        return true
                        }else{

                        return false
                    }

                } );


                if(filterStartTime == true) {
                    alert("horario permitido")
                    await actions.createSchedule(timeInicio + amPmInicio, timeFinal + amPmFinal, calendar_date, durationTime )
                    setShowCreate(!showcreate)
                    await actions.getPsicologiScheduleDay(id, fecha)

                } 
                if(filterStartTime.length == 0) {
                    alert("horario permitido")
                    await actions.createSchedule(timeInicio + amPmInicio, timeFinal + amPmFinal, calendar_date, durationTime )
                    setShowCreate(!showcreate)
                    await actions.getPsicologiScheduleDay(id, fecha)

                }
        }
        else{
            alert("error")
            }
        
    }
      

    const deleteDate = async(itemId) => {
        
        // event.preventDefault();
        setIsLoading(true)
        try{
            const deleteSchedule = await actions.deleteSchedule(itemId)
            const scheduleDay = await actions.getPsicologiScheduleDay(id, fecha)
          
      } catch (error) {
            console.error(error); // Handle any errors
          } finally {
            setIsLoading(false); // Finalizar la carga
      }
    }

    function showcreatedates(event) {
        event.preventDefault();
        setShowCreate(!showcreate)
    }
   
    function onChangeTimeInicio(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setTimeInicio(event)
        let elemento1 = parseInt(timeInicio.replace(":","" ))

    }
    function onChangeTimeFinal(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setTimeFinal(event)
        let elemento2 = timeFinal.replace(":","" )
    }


    return (
        <>
        <Button onPress={onOpen} color="secondary">Open Modal</Button>
        <Modal 
            backdrop="opaque" 
            size="4xl"
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            radius="lg"
            classNames={{
            // margin:"10px",
            body: "py-6 text-[black]" ,
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[white] dark:bg-[#19172c] text-[black]",
            header: "border-b-[1px] border-[#292f46] bg-[#19172c] text-[white]",
            footer: "border-t-[1px] border-[#292f46] text-[white]",
            closeButton: "hover:bg-white/5 active:bg-white/10 text-[white]",
            }}
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="modal-header flex flex-col gap-1">Configuracion de Calendario para el {calendar_date2}</ModalHeader>
              <ScrollShadow hideScrollBar className="w-[full] h-[400px]">
              <ModalBody className="modal-Body">
              <div className="">
                            
                <div className="form-group">
                    <p >Horarios</p>  
                </div>
                               
                    <div className="contenedor">

                        {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
                                    <div className="grid-container">
                                    {store.scheduleSession == false ? (<p>No hay horarios Asignados</p>):(

                                    <>
                                        {transition((style, item) =>
                                        item ? (
                                            <animated.div style={style} className="w-full h-[50px] col-span-12 sm:col-span-1" >
                                            
                                <Card
                                isBlurred
                                className=" mini-box border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                                shadow="sm"
                                >
                        <CardBody>
                            <div className="justify-between">
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-semibold text-foreground/90 subtitle2">{to12HourFormat(item.start_time) + ' - ' + to12HourFormat(item.end_time) +" "+ " "} 
                                    <button type="button" onClick={() => deleteDate(item.id)} name={item.id} ><i class="fa-regular fa-trash-can"></i></button>
                                    </h3>
                                </div>
                            </div>
                            
                            </CardBody>
                            </Card>                  
                                    </animated.div>
                                        ) : (
                                            ''
                                        )
                                        )}
                                </>
                                )}
                                </div>
                            )}
                    </div>


                    
                    <Button onClick={showcreatedates} color="secondary">Agregar nuevo horario</Button>
                    <br /><br />

                    {transition_2((style, item) =>
                        item ? <animated.div style={style} className="form-group">
                        
                            <div className="row">
                                
                                <div className="row">

                                    <div className="p-2">
                                        <p>Hora de inicio</p>
                                        <TimePicker
                                        // amPmAriaLabel="Select AM/PM"
                                        format="hh:mm a"
                                        disableClock={true}
                                        onChange={onChangeTimeInicio}
                                        clockIcon={null}
                                        value={timeInicio}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <p>Hora de cierre</p>
                                        <TimePicker
                                        disableClock={true}
                                        format="hh:mm a"
                                        onChange={onChangeTimeFinal}
                                        clockIcon={null}
                                        value={timeFinal}
                                        />
                                    </div>
                                </div>
                                <div className="p-2 mt-4">
                                {/* <button className="btn btn-primary button_create_date" onClick={onCreatetimework} >Crear Horario</button> */}
                                <Button onClick={onCreatetimework} className="" color="secondary">Crear Horario</Button>
                                </div>

                            </div>
                            {/* </div> */}
                        </animated.div> : <div className="form-group" />)}



                    {/* {showcreate ? : <></>} */}

                                    

                                
                            
                        
                </div>
              </ModalBody>
                </ScrollShadow>
              <ModalFooter>
                {/* <Button color="foreground" variant="light" color="secondary" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="secondary" className="bg-[#6f4ef2] shadow-lg  shadow-indigo-500/20" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
    )
}
