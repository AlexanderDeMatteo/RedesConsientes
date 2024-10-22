import React, { useState, useContext, useEffect, useRef } from "react";
// import "../../../styles/custom_calendar.css"
import "../../../styles/calendar/calendar2.css"
import { Context } from "../../store/appContext.js";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "@react-spring/web";
import {Card, CardHeader, CardBody, Avatar, Image, Button} from "@nextui-org/react";
import { Modal } from "../../component/Modal.js";
import { useParams } from "react-router-dom";
import {Calendar} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";
import {today, getLocalTimeZone} from "@internationalized/date";
import { CalendarCustom2 } from "./calendarCustom2.js";


export const Calendar2 = () => {
    const { actions, store } = useContext(Context)
    const [selectedDate, setSelectedDate] = useState(today);
    const [isLoading, setIsLoading] = useState(false);
    const [fecha, setFecha] = useState(new Date(selectedDate))
    const {id} = useParams(0)
    const [isFollowed, setIsFollowed] = React.useState(false);
    
    const dateValue= new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())
    const startDate= new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())

    console.log(new Date(fecha))
    console.log(fecha)
    let a = new Date(fecha)

    const transition = useTransition(store.scheduleSession, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },

    });

    
    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true); // Iniciar la carga
          try {
            const data = await actions.getPsicologiScheduleDay(id, a);
            
            // Usa la data aquí
         
          } catch (error) {
            console.error(error); // Handle any errors
          } finally {
            setIsLoading(false); // Finalizar la carga
          }
        };
    
        fetchData();
    }, [selectedDate]);

    function onChangeCalendar(event) {
        let evento = event
        setSelectedDate(evento)  
        setFecha(`${evento["month"]} ${evento["day"]} ${evento["year"]}`)
        
    }
    
    const months = (month) => {
      if(month == '01' ){
        return "Enero"
      }
      if(month == "02" ){
        return "Febrero"
      }
      if(month == '03' ){
        return "Marzo"
      }
      if(month == '04' ){
        return "Abril"
      }
      if(month == '05' ){
        return "Mayo"
      }
      if(month == '06' ){
        return "Junio"
      }
      if(month == '07' ){
        return "Julio"
      }
      if(month == '08' ){
        return "Agosto"
      }
      if(month == '09' ){
        return "Septiembre"
      }
      if(month == '10' ){
        return "Octubre"
      }
      if(month == '11' ){
        return "Noviembre"
      }
      if(month == '12' ){
        return "Diciembre"
      }
      
    }

    const calendar_date= selectedDate["year"] + "/" + selectedDate["month"] + "/" + selectedDate["day"]
    
    const calendar_date2= selectedDate["day"] + " de " + months(selectedDate["month"]) + " de " + selectedDate["year"]
 

    async function onCreateSession(event) {
        event.preventDefault();
        await actions.handle_reserved(event.target.name)
        await actions.getPsicologiScheduleDay(id, fecha)
    }


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
    

    return (
        <>
  <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Calendario</h1>
          </div>
        </div>
      </div>
    </section>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
        <Card className="bg-white">
      <CardHeader className="pb-0 pt-2 px-4 flex-col justify-content-center" id="titulo">
        <p  className=" uppercase font-bold p-2">{calendar_date2}</p>
        {id == store.userData.id ?
        <CalendarCustom2 calendar_date2={calendar_date2} calendar_date={calendar_date} fecha={fecha}/>
    : " "}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
      {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
            </div></div>) : (
                <div>
                {store.scheduleSession == false ? (<p>No hay horarios disponibles</p>):(

                <>
                    {transition((style, item) =>
                      item ? (
                          <animated.div style={style} className="p-2" >
                          
            <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
            >
      <CardBody>
        <div className="justify-between">
            <div className="flex justify-between">
                <h3 className="font-semibold text-foreground/90">{to12HourFormat(item.start_time) + ' - ' + to12HourFormat(item.end_time)}</h3>
                 {id == store.userData.id ? 
                  <Button
                  className={item.reserved ? "bg-transparent text-foreground border-default-200" : ""}
                  color="secondary"
                  radius="full"
                  size="sm"
                  variant={item.reserved ? "bordered" : "solid"}
                  >
                  {item.reserved ? "Asignada" : "Disponible"}
              </Button>
                        : 
                  <Button
                        className={item.reserved ? "bg-transparent text-foreground border-default-200" : ""}
                        color="secondary"
                        radius="full"
                        onClick={onCreateSession}
                        name={item.id}
                        size="sm"
                        variant={item.reserved ? "bordered" : "solid"}
                        onPress={() => setIsFollowed(!isFollowed)}
                        >
                        {item.reserved ? "Eliminar" : "Agendar"}
                    </Button>}
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

</CardBody>
        </Card>
        </div>
        <div className="col-md-8 mt-2">
          <div className="">
            <div className="" id="calendario">
            <Calendar 
                aria-label="Date (Controlled)" 
                defaultValue={today(getLocalTimeZone())}
                minValue={today(getLocalTimeZone())}
                onChange={onChangeCalendar}
                visibleMonths={id == store.userData.id ? 3 : 2}
                color= {"secondary"}
            />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    )
}
