import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_today.css"
import { Context } from "../store/appContext.js";
import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";
import { useParams } from "react-router-dom";
import Calendar from 'react-calendar';
// import { useParams } from "react-router-dom";


export const CalendarToday_custom = () => {
    const { actions, store } = useContext(Context)
    const [selectedDate, setSelectedDate] = useState(new Date().toString().split(" "));
    const [items, setItems] = useState([store.scheduleSession]);
    const [dayNumber, setDayNumber] = useState(selectedDate[2])
    const [month, setMonth] = useState(selectedDate[1])
    const [year, setYear] = useState(selectedDate[3])
    const [day, setDay] = useState(selectedDate[0])
    const [fecha, setFecha] = useState(`${selectedDate[0]}, ${selectedDate[2]} ${selectedDate[1]} ${selectedDate[3]}`)
    // const {id} = useParams()
    const {id} = useParams()
    
    const transition = useTransition(store.scheduleSession, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },

    });
    console.log(fecha)
//     ids=store.userData.id
//    console.log()

    console.log(items)

    useEffect(() => {
        actions.getPsicologiScheduleReservedDay(1, fecha)
        

    }, [])



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
                <div className="row">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-7">

                                {transition((style, item) =>
                                    item ? <animated.div style={style} className="row row_custom" >
                                        <div className="col-md-3 col-sm-6 col-12">

                                            <div className="info-box bg-primary box_info">
                                                <span className="info-box-icon"><i className="far fa-bookmark"></i></span>
                                                <div className="info-box-content">

                                                    <div className="card-tools button-agend">
                                                        {/* <span className="info-box-text">Cita</span>
                                            <a href="#" className="btn btn-tool btn-link button-agend  button-info">Agendar Cita</a> */}

                                                        <div className="card-header header_custom">
                                                            <h3 className="card-title title_custom">Cita</h3>
                                                            <div className="card-tools">
                                                                <a className="btn btn-tool btn-link button-agend" data-card-widget="collapse">{item.calendar_date}
                                                                </a>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <span className="info-box-number">Hora: {item.start_time} - {item.end_time}</span>
                                                    {/* <div className="progress">
                                            <div className="progress-bar" ></div>
                                        </div> */}
                                                    <a href={`/session/${id}/${item.room_number}`} className="progress-description">
                                                    Ir a Session
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                    </animated.div> : '')}

                            </div>

                            <div class="col-md-5 custom_card">
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">Frase del Dia</h3>

                                    </div>

                                    <div class="card-body">
                                        La frase del Dia....
                                    </div>

                                </div>

                            </div>
                        </div></div>
                </div>


            </div>
        </>
    )
}
