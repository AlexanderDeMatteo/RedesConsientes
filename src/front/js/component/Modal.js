
import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_config.css"
import { Context } from "../store/appContext.js";

import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";

export const Modal = ({calendar_date2, calendar_date, fecha}) => {
    const { actions, store } = useContext(Context)
    const [showcreate, setShowCreate] = useState(false);
    const [DatesCreate, setDatesCreate] = useState({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' });


    // let diaFiltado = store.psicologySession.filter((data) => data.calendar_date == calendar_date)

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
        actions.getPsicologiScheduleDay(1, fecha)

    }, [fecha])

    async function onCreatetimework(event) {
        event.preventDefault();
        await actions.createSchedule(DatesCreate.horaincio + DatesCreate.TIMEinicio, DatesCreate.horafina + DatesCreate.TIMEfinal, calendar_date )
        setDatesCreate({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' })
        setShowCreate(!showcreate)
        await actions.getPsicologiScheduleDay(1, fecha)
    }
    function deleteDate(event) {
        event.preventDefault();
        actions.deleteSchedule(event.target.name)
        actions.getPsicologiScheduleDay(1, fecha)
    }
    function showcreatedates(event) {
        event.preventDefault();
        setShowCreate(!showcreate)
    }

    function handleChange(event) {
        console.log(event)
        const { name, value, type, checked } = event.target
        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function selectTime(event) {
        console.log(event.target)
        const { value } = event.target


        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                ['TIMEinicio']: value === "1" ? 'am' : 'pm'
                
            }
        })
    }
    function selectTime2(event) {
        console.log(event.target)
        const { value } = event.target


        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                ['TIMEfinal']: value === "1" ? 'am' : 'pm'
            }
        })
    }

    function onCreateSession(event) {
        event.preventDefault();
        // console.log(event.target.name)d
        actions.createSession(event.target.name, calendar_date2)
        console.log(store.psicologySession)
        actions.getPsicologiScheduleDay(1, fecha)
    }


    return (
        <>

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalagenda">
                añadir horario disponible
            </button>

            <div class="modal fade" id="modalagenda" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Añadir horario para {calendar_date2}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Configuracion de Calendario</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="row">

                    <div className="col-md-12">
                        <form>
                            <div className="card-body">
                             
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Horarios</label>
                                    {/* <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" /> */}
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                                        <div className="row">

                                            {transition((style, item) =>
                                                item ? <animated.div style={style} className="col-12 col-sm-4" ><div className="info-box bg-light">
                                                    <div className="info-box-content">
                                                        {/* <span className="info-bozx-text text-center text-muted">Total amount spent</span> */}
                                                        <span className="info-box-number text-center text-muted mb-0">{`${item.start_time} - ${item.end_time}`}</span>
                                                    </div>
                                                    <button type="button" onClick={deleteDate} name={item.id} className="close button_delete_date" aria-hidden="true">&times;</button>
                                                </div>
                                                </animated.div> : '')}




                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={showcreatedates}>Agregar nuevo horario</button>
                                        <br /><br />

                                        {transition_2((style, item) =>
                                            item ? <animated.div style={style} className="form-group">
                                                {/* <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" /> */}
                                                {/* <div className="card-body"> */}
                                                {/* <label htmlFor="exampleInputEmail1">Horarios</label> */}
                                                <div className="row">
                                                    <div className="col-3">
                                                        De: <input onChange={handleChange} name='horaincio' type="text" value={DatesCreate.horaincio} className="form-control" placeholder="Hora de Inicio" />
                                                        <select name='TIMEinicio' onChange={selectTime} class="custom-select form-control">
                                                            <option value="1" selected>AM</option>
                                                            <option value="2">PM</option>

                                                        </select>
                                                    </div>
                                                    <div className="col-4">
                                                        Hasta:<input onChange={handleChange} name='horafina' type="text" value={DatesCreate.horafina} className="form-control" placeholder="Hora de Fin" />
                                                        <select name='TIMEfinal' onChange={selectTime2} class="custom-select form-control">
                                                            <option value="1" selected>AM</option>
                                                            <option value="2" >PM</option>

                                                        </select>
                                                    </div>
                                                    <div className="col-5">
                                                        <button className="btn btn-primary button_create_date" onClick={onCreatetimework} >Crear Horario</button>
                                                    </div>

                                                </div>
                                                {/* </div> */}
                                            </animated.div> : <div className="form-group" />)}



                                        {/* {showcreate ? : <></>} */}

                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
