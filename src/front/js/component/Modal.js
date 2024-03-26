
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
    const [timeInicio, setTimeInicio] = useState("12:00");
    const [amPmInicio, setAmPmInicio] = useState("");
    const [timeFinal, setTimeFinal] = useState("12:00");
    const [amPmFinal, setAmPmFinal] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [horainicioFinal,setHoraInicioFinal] = useState("");
    const [value, onChange] = useState('10:00');


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

    useEffect(()=>{
        console.log(timeInicio)
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

    // function range(start, stop=undefined, step=1) {
    //     const startArray = stop  === undefined ? 0 : start;
    //     const stopArray = stop  === undefined ? start : stop;
    //     return Array.from({ length: (stopArray - startArray) / step + 1}, (_, i) => startArray + (i * step));
    // }
    const filtroTiempoMenor = (item) =>{
        if(item == 0){
            console.log(item)
            const str = "1200"
            const halfInicio = str.slice(0,2)
            const halfFinal = str.slice(2)
            const timeFinal = halfInicio+":"+halfFinal
            console.log(timeFinal)
            return timeFinal
        }
        if(item == -1200){
            console.log(item)
            const str = "0000"
            const halfInicio = str.slice(0,2)
            const halfFinal = str.slice(2)
            const timeFinal = halfInicio+":"+halfFinal
            console.log(timeFinal)
            return timeFinal
        }
        const str = item.toString()
        const halfInicio = str.slice(0,1)
        const halfFinal = str.slice(1)
        const timeFinal = halfInicio+":"+halfFinal
        return timeFinal
    }

    const filtroTiempoMayor = (item) =>{
        if(item == 0){
            const str = "1200"
            const halfInicio = str.slice(0,1)
            const halfFinal = str.slice(1)
            const timeFinal = halfInicio+":"+halfFinal
            return timeFinal
        }
        if(item == -1200){
            console.log(item)
            const str = "0000"
            const halfInicio = str.slice(0,2)
            const halfFinal = str.slice(2)
            const timeFinal = halfInicio+":"+halfFinal
            return timeFinal
        }
        const halfInicio = item.toString().slice(0,2)
        const halfFinal = item.toString().slice(2)
        const timeFinal = halfInicio+":"+halfFinal
        return timeFinal
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
                if(filterStartTime.length == 0) {
                    alert("horario permitido")
                    await actions.createSchedule(timeInicio + amPmInicio, timeFinal + amPmFinal, calendar_date, durationTime )
                    setDatesCreate({ "horaincio": 0, "horafina": 0, "TIMEinicio": 'am', "TIMEfinal": 'am' })
                    setShowCreate(!showcreate)
                    await actions.getPsicologiScheduleDay(id, fecha)

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
        const { name, value, type, checked } = event.target
        setDatesCreate(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const timefilter = (time) =>{
            // console.log(time.replace(":","" ))
            // let filter1 = time.replace(":","" )
            // console.log(filter2)
            // const filter2 = filter1.replace("AM","" )
            // console.log(filter3)
            // const filter3 = filter2.replace("PM","" )
            // console.log(filter4)
            // const filter4 = parseInt(filter3)
            // console.log(filter5)
            // const filter5 = filter4 - 1200
        

    } 
   



    function onChangeTimeInicio(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setTimeInicio(event)
        let elemento1 = parseInt(timeInicio.replace(":","" ))

        console.log(typeof(elemento1))
        console.log(amPmInicio)
        console.log(elemento1)
  
    }
    function onChangeTimeFinal(event) {
        // setItems([{ text: '9am - 10am' }, { text: '1pm-2pm' }, { text: '3pm-4pm' }]);
        setTimeFinal(event)
        let elemento2 = timeFinal.replace(":","" )

        console.log(elemento2)
    }


    return (
        <>
            {!store.userData.is_psicologo ? " " : 
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Añadir horario
            </button>}

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Añadir horario para {calendar_date2}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        
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

                                    {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
                                        <div className="d-flex">
        
                                            {transition((style, item) =>
                                                item ? <animated.div style={style} className="col-12 col-sm-4" ><div className="info-box bg-light">
                                                    <div className="info-box-content">
                                                        {/* <span className="info-bozx-text text-center text-muted">Total amount spent</span> */}
                                                        <span className="info-box-number text-center text-muted mb-0">{`${to12HourFormat(item.start_time)} - ${to12HourFormat(item.end_time)}`}</span>
                                                    </div>
                                                    <button type="button" onClick={deleteDate} name={item.id} className="close button_delete_date" aria-hidden="true">&times;</button>
                                                </div>
                                                </animated.div> : '')}

                                        </div>)}

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
                                                            // amPmAriaLabel="Select AM/PM"
                                                            format="hh:mm a"
                                                            disableClock={true}
                                                            onChange={onChangeTimeInicio}
                                                            clockIcon={null}
                                                            value={timeInicio}
                                                            />
                                                        </div>
                                                        <div>
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
                        <div className="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
