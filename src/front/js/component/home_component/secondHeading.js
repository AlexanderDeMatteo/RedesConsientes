import React from "react";
import img from "../../../img/c7mw1c9u4JlHGT8oQ8Wy--1--j0iwx.jpg"
import {Image} from "@nextui-org/react";
import "../../../styles/jumbotron.css"
export const SecondHeading = () =>{
    return(
        <section className="section padding-bottom-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
                        <div className="left-heading">
                            <h2 className="section-title titulo">Tu práctica, elevada al siguiente nivel</h2>
                        </div>
                        <div className="left-text cuerpoTexto">
                            <p>¿Eres psicólogo y buscas herramientas para mejorar tus servicios? ¡Estás en el lugar correcto! Nuestra plataforma te ofrece todo lo que necesitas para conectar con tus pacientes, desarrollar tus habilidades y crecer profesionalmente.
                            <br/>
                            <br/>
                            <strong>Porque creemos que una buena salud mental es fundamental para una vida plena.</strong></p>
                        </div>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big" data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                        {/* <img src={img} className="rounded img-fluid d-block mx-auto" alt="App"/> */}
                        <Image
                            isBlurred
                            width={300}
                            src={img}
                            alt="NextUI Album Cover"
                            className="m-5"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}