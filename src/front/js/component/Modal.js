
import React, { useState, useContext, useEffect, useRef } from "react";
// import "../../styles/custom_calendar_config.css"
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import { useTransition, animated } from "react-spring";
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
// import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import "../../styles/modal.css";

export const Modal = ({calendar_date2, calendar_date, fecha}) => {
    const { actions, store } = useContext(Context)
    const [showcreate, setShowCreate] = useState(false);
    const [DatesCreate, setDatesCreate] = useState({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' });
    const {id} = useParams(0)
    const [time, setTime] = useState(["00:00", "00:00"])
    const [timeInicio, setTimeInicio] = useState("12:00")
    const [amPmInicio, setAmPmInicio] = useState("PM")
    const [timeFinal, setTimeFinal] = useState("12:00")
    const [amPmFinal, setAmPmFinal] = useState("PM")


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
        actions.getPsicologiScheduleDay(id, fecha)

    }, [fecha])

    function range(start, stop=undefined, step=1) {
        const startArray = stop  === undefined ? 0 : start;
        const stopArray = stop  === undefined ? start : stop;
        return Array.from({ length: (stopArray - startArray) / step + 1}, (_, i) => startArray + (i * step));
    }

    async function onCreatetimework(event) {
        event.preventDefault();
        let elemento1 = parseInt(timeInicio.replace(":","" ))
        let elemento2 = parseInt(timeFinal.replace(":","" ))
        let duracionMin= 45
        let durationTime = elemento2 - elemento1
        let schedule = store.scheduleSession
        console.log(schedule)
            if(elemento2 >= elemento1 && elemento2 >= (elemento1 + duracionMin)){
                let filterStartTime = schedule.filter(schedule => {
                    const scheduleStartTime = Number(schedule.start_time.replace(":", "").replace("PM", ""));
                    const scheduleEndTime = Number(schedule.end_time.replace(":", "").replace("PM", ""))
                    let orden = `${scheduleStartTime} ${scheduleEndTime}`
                    console.log(orden)
                    const statusInicio = elemento1 < scheduleStartTime || elemento1 > scheduleEndTime
                    const statusFinal = elemento2 > scheduleEndTime || elemento2 < scheduleStartTime
                    console.log(statusFinal)
                    console.log(statusInicio)
                        if(statusInicio == false && statusFinal == false){
                            alert("el horario no esta disponible, verifica ambas horas")
                            console.log(statusInicio == false && statusFinal == false)
                            console.log(filterStartTime)
                            return true
                        }
                        else if(statusInicio == false){
                            alert("el horario no esta disponible, verificar la hora de inicio")
                            console.log(statusInicio == false)
                            console.log(filterStartTime)
                        return true
                        }
                        else if(statusFinal == false){
                            alert("el horario no esta disponible, verificar la hora final")
                            statusInicio == false
                            console.log(statusFinal == false)
                        return true
                        }else{
                            console.log(filterStartTime)
                        return false
                    }
                    
                } );
                console.log(filterStartTime)
                if(filterStartTime == true) {
                    alert("horario permitido")
                    await actions.createSchedule(timeInicio + amPmInicio, timeFinal + amPmFinal, calendar_date, durationTime )
                    setDatesCreate({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' })
                    setShowCreate(!showcreate)
                    await actions.getPsicologiScheduleDay(id, fecha)
                    console.log(filterStartTime)
                } 
        }
        else{
            alert("error")
            }
        
    }
    function deleteDate(event) {
        event.preventDefault();
        actions.deleteSchedule(event.target.name)
        actions.getPsicologiScheduleDay(id, fecha)
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
        actions.getPsicologiScheduleDay(id, fecha)
    }

    function onChangeTime(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setTime(event)
        setAmPm(event)
        console.log(amPm)
        console.log(time)
    }
    function onChangeTimeInicio(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setTimeInicio(event)
        let elemento1 = timeInicio.replace(":","" )
        console.log(elemento1)
        if(elemento1 >= 1200){
            setAmPmInicio("PM")
        }
        else{
            setAmPmInicio("AM")
        }
        console.log(amPmInicio)
    }
    function onChangeTimeFinal(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setTimeFinal(event)
        let elemento2 = timeFinal.replace(":","" )
        console.log(elemento2)
        if(elemento2 >= 1200){
            setAmPmFinal("PM")
        }
        else{
            setAmPmFinal("AM")
        }
        console.log(amPmFinal)
        console.log(timeFinal)
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
                                                    {/* <div className="col-3">
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
                                                    <div className="">
                                                    <TimeRangePicker
                                                        onChange={onChangeTime}
                                                        value={time}
                                                        clockIcon={null}
                                                        
                                                    />
                                                    </div> */}
                                                    <div className="row">
                                                        <div>
                                                            <p>Hora de inicio</p>
                                                            <TimePicker 
                                                            onChange={onChangeTimeInicio}
                                                            clockIcon={null}
                                                            value={timeInicio}
                                                            />
                                                        </div>
                                                        <div>
                                                            <p>Hora de cierre</p>
                                                            <TimePicker
                                                            onChange={onChangeTimeFinal}
                                                            clockIcon={null}
                                                            value={timeFinal}
                                                            />
                                                        </div>
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
