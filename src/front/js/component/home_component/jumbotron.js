import React from "react";
import "../../../styles/jumbotron.css"
import conexion_img from "../../../img/0wLS4sNorp3DJxuchwQU--1--tmobh.jpg";
// import "../../../styles/landingpage/bootstrap.min.css"
// import "../../../styles/landingpage/flex-slider.css"
// import "../../../styles/landingpage/font-awesome.css"
import "../../../styles/landingpage/templatemo-softy-pinko.css"


export const Jumbotron = () => {
    return (
        <div className="welcome-area" id="welcome">
            <div className="header-text">
                <div className="container">
                    <div className="row">
                        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                            <h1 className="titulo textColor">Tranformando<strong>Vidas</strong>,</h1>
                            <h2 className="subtitulo textColor mb-2">Recuperando Tu Salud <strong>Mental</strong></h2>
                            <p className="cuerpoTexto textColor">Softy Pinko is a professional Bootstrap 4.0 theme designed by Template Mo 
                            for your company at absolutely free of charge</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

