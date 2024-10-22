import React from "react";
import img from "../../../img/0wLS4sNorp3DJxuchwQU--1--tmobh.jpg"
import {Image} from "@nextui-org/react";
import "../../../styles/jumbotron.css"
import { Link } from "react-router-dom";

export const FirstHeading = () =>{
    return(
        <section className="section padding-top-70 padding-bottom-100" id="features">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-12 col-sm-12 align-self-center" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                    {/* <img src={img} className="rounded img-fluid d-block mx-auto" alt="App"/> */}
                    <Image
                        isBlurred
                        width={300}
                        src={img}
                        alt="NextUI Album Cover"
                        className="m-5"
                        />
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
                    <div className="left-heading">
                        <h2 className="section-title titulo"><strong>Acerca de nosotros</strong></h2>
                    </div>
                    <div className="left-text">
                        <p className="cuerpoTexto">"<strong>Nacemos de un sueño.</strong> Hace años, un estudiante de psicología imaginó un mundo donde los profesionales de la salud mental pudieran conectar, compartir conocimientos y ofrecer servicios de calidad a sus pacientes. Hoy, ese sueño se ha convertido en realidad.</p>
                        {/* <Link to="sobre-nosotros">Saber mas</Link> */}
                        <a href="sobre-nosotros" class="main-button cuerpoTexto">Saber mas</a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    
                </div>
            </div>
        </div>
    </section>
    )
}