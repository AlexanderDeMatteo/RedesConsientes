import React from "react";
import "../../../styles/jumbotron.css"

export const Features = () =>{
    return(
        <section className="section home-feature">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                            <div className="features-small-item">
                                <div className="icon">
                                <i class="fa-solid fa-person-chalkboard"></i>
                                </div>
                                <h5 className="features-title titulo"><strong>Terapia Personalizada</strong></h5>
                                <p className="cuerpoTexto">Encuentra el enfoque terapéutico que mejor se adapta a tus necesidades.</p>
                            </div>
                        </div>
                       

                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                            <div className="features-small-item">
                                <div className="icon">
                                <i class="fa-solid fa-user-tie"></i>
                                </div>
                                <h5 className="features-title titulo"><strong>Profesionales Calificados</strong></h5>
                                <p className="cuerpoTexto">Conecta con terapeutas experimentados y especializados.</p>
                            </div>
                        </div>
                       

                       
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                            <div className="features-small-item">
                                <div className="icon">
                                <i class="fa-solid fa-people-group"></i>
                                </div>
                                <h5 className="features-title titulo"><strong>Comunidad de Apoyo</strong></h5>
                                <p className="cuerpoTexto">Únete a una comunidad de personas que comparten experiencias similares</p>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}