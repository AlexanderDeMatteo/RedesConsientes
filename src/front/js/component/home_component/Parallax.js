import React from "react";
import img from "../../../img/images/work-process-item-01.png"
import "../../../styles/jumbotron.css"

export const Paralax = () => {
    return(
        <section className="mini" id="work-process">
        <div className="mini-content">
            <div className="container">
                <div className="row">
                    <div className="offset-lg-3 col-lg-6">
                        <div className="info">
                            <h1 className="titulo">Nuestro rumbo juntos</h1>
                            <p className="cuerpoTexto">¡Queremos que seas parte de nuestro crecimiento! En este mapa, te mostramos hacia dónde nos dirigimos y cómo tus sugerencias nos ayudarán a construir la plataforma de tus sueños.</p>
                        </div>
                    </div>
                </div>

                {/* ***** Mini Box Start ***** */}
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                        <a href="#" className="mini-box">
                        <i class="fa-solid fa-book-open-reader"></i>
                            <p className="subtitulo2">En Desarrollo</p>
                            <span className="cuerpoTexto">Pagina de Inicio</span>
                            <br></br>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                        <a href="#" className="mini-box">
                        <i class="fa-solid fa-book"></i>
                            <p className="subtitulo2">Pendiente</p>
                            <span className="cuerpoTexto">Pagina de Registro e Inicio</span>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                        <a href="#" className="mini-box">
                        <i class="fa-solid fa-book"></i>
                            <p className="subtitulo2">Pendiente</p>
                            <span className="cuerpoTexto">Perfil del Usuario</span>
                            <br></br>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                        <a href="#" className="mini-box">
                        <i class="fa-solid fa-book"></i>
                        <p className="subtitulo2">Pendiente</p>
                            <span className="cuerpoTexto">Pagina de Noticias</span>
                            <br></br>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                        <a href="#" className="mini-box">
                        <i class="fa-solid fa-book"></i>
                        <p className="subtitulo2">Pendiente</p>
                            <span className="cuerpoTexto">Manejo de Agenda Y Video LLamadas</span>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-6 col-6">
                        <a href="#" className="mini-box">
                        <i class="fa-solid fa-book"></i>
                        <p className="subtitulo2">Pendiente</p>
                            <span className="cuerpoTexto">Expediente de Pacientes</span>
                        </a>
                    </div>
                </div>
                {/* ***** Mini Box End ***** */}
            </div>
        </div>
    </section>
    )
}