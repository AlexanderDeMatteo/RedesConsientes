import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/custom_calendar_config.css"
import { Context } from "../store/appContext.js";

import 'react-calendar/dist/Calendar.css';
import { useTransition, animated } from "react-spring";

export const CalendarCogif_custom = () => {
    const { actions, store } = useContext(Context)
    const [showcreate, setShowCreate] = useState(false);
    const [DatesCreate, setDatesCreate] = useState({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' });


    const transition = useTransition(store.userTime, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
    });
    const transition_2 = useTransition(showcreate, {
        from: { x: 0, y: 50, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        leave: { x: 0, y: 50, opacity: 0 },
    });

    useEffect(() => {

    }, [store])

    function onCreatetimework(event) {
        event.preventDefault();
        actions.createSchedule(DatesCreate.horaincio + DatesCreate.TIMEinicio, DatesCreate.horafina + DatesCreate.TIMEfinal)
        setDatesCreate({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' })
        setShowCreate(!showcreate)
        actions.getSchedule()
    }
    function deleteDate(event) {
        event.preventDefault();
        actions.deleteSchedule(event.target.name)
        actions.getSchedule()
    }
    function showcreatedates(event) {
        event.preventDefault();
        setShowCreate(!showcreate)
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function selectTime(event) {
   
        const { value } = event.target


        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                ['TIMEinicio']: value === "1" ? 'am' : 'pm'
            }
        })
    }
    function selectTime2(event) {
   
        const { value } = event.target


        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                ['TIMEfinal']: value === "1" ? 'am' : 'pm'
            }
        })
    }




    return (
        <>

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
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
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
                                                        <select name='TIMEinicio' onChange={selectTime} className="custom-select form-control">
                                                            <option value="1" selected>AM</option>
                                                            <option value="2">PM</option>

                                                        </select>
                                                    </div>
                                                    <div className="col-4">
                                                        Hasta:<input onChange={handleChange} name='horafina' type="text" value={DatesCreate.horafina} className="form-control" placeholder="Hora de Fin" />
                                                        <select name='TIMEfinal' onChange={selectTime2} className="custom-select form-control">
                                                            <option value="1" selected>AM</option>
                                                            <option value="2" >PM</option>

                                                        </select>
                                                    </div>
                                                    <div className="col-5">
                                                        <button className="btn btn-primary button_create_date" onClick={onCreatetimework}>Crear Horario</button>
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
        </>
    )
}
