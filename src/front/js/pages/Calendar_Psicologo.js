import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar.css"
import { Context } from "../store/appContext.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "@react-spring/web";
import { useParams } from "react-router-dom";

export const Calendar_Psicologo = () => {
    const { actions, store } = useContext(Context)
    const [selectedDate, setSelectedDate] = useState(new Date().toString().split(" "));
    const [items, setItems] = useState([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
    const [dayNumber, setDayNumber] = useState(selectedDate[2])
    const [month, setMonth] = useState(selectedDate[1])
    const [year, setYear] = useState(selectedDate[3])
    const [day, setDay] = useState(selectedDate[0])
    const [fecha, setFecha] = useState(`${selectedDate[0]}, ${selectedDate[2]} ${selectedDate[1]} ${selectedDate[3]}`)
    // const [todayDay, setToDay] = useState(new Date().toString().split(" "));
    const {id} = useParams()
    
    const dateValue= new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())
    const startDate= new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())
    
    
    const transition = useTransition(store.psicologySession, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },

    });

   
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await actions.getPsicologiScheduleDay(id, fecha);
            console.log(data)
            // Usa la data aquí
          
        };
      
        fetchData();
      }, [selectedDate]);

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

    function onChangeCalendar(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setSelectedDate(event.toString().split(" "))
        let today_date = event.toString().split(" ")
        setDayNumber(today_date[2])
        setDay(today_date[0])
        setMonth(today_date[1])
        setYear(today_date[3])
        setFecha(`${today_date[0]}, ${today_date[2]} ${today_date[1]} ${today_date[3]}`)
        
    }

    const calendar_date= selectedDate[3] + "/" + selectedDate[1] + "/" + selectedDate[2]
    const calendar_date2= selectedDate[2] + "/" + selectedDate[1] + "/" + selectedDate[3]

    async function onCreateSession(event) {
        event.preventDefault();
        await actions.handle_reserved(event.target.name)
        await actions.getPsicologiScheduleDay(id, fecha)
    }



    const months = {
        'Oct': 'Oct',
        'Dec': 'Dic',
        'Jan': 'Ene',
        'Feb': 'Feb',
        'Mar': 'Mar',
        'Apr': 'Abr',
        'May': 'May',
        'Jun': 'Jun',
        'Jul': 'Jul',
        'Nov': 'Nov',
        'Aug': 'Agos',
        'Sep': 'Sep'

    }
    const Days = {
        'Mon': 'Lunes',
        'Tue': 'Martes',
        'Wed': 'Miercoles',
        'Thu': 'Jueves',
        'Fri': 'Viernes',
        'Sat': 'Sabado',
        'Sun': 'Domingo',
    }
    

    return (
        <>

            <div className="content">
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
                        <div className="col-md-3">
                            <div className="sticky-top mb-3">
                                {/* <div className="card"> */}
                                <div className="card card-primary">
                                    <div className="card-header column">
                                        <h3 className="card-title">{calendar_date2}</h3>
                                    </div>


                                    <form className="form-horizontal">
                                        <div className="card-body">
                                            <div id="external-events">
                                                {transition((style, item) =>
                                                    item ? <animated.div style={style} className={`card ${item.reserved == true ? "card-success" : "card-primary"} card-outline`} ><div id="calendarBotonDiv" className="card-header">
                                                        <h3 className="card-title letter_small">{to12HourFormat(item.start_time) + ' - ' + to12HourFormat(item.end_time)}</h3>
                                                        <div id="botonCalendar" className="card-tools button-agend">
                                                            <a onClick={onCreateSession} name={item.id} className="btn btn-tool btn-link button-agend">Agendar Cita</a>
                                                        </div>
                                                       
                                                    </div> </animated.div> : '')}


                                            </div>
                                          
                                        </div>
                                        

                                    </form>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-9 fondo_tran">
                            <div className="card card-primary fondo_tran">
                                <div className="card-body p-0 fondo_tran">

                                    <Calendar 
                                                onChange={onChangeCalendar} 
                                                className="custom_calendar_css" 
                                                locale="es" 
                                                // value={dateValue}
                                                minDate={startDate}
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
