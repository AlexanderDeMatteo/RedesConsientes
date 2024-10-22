import React from "react";
import hiro from "../../../img/hiromi2.jpg"
import adam from "../../../img/adam.jpg"
import "../../../styles/jumbotron.css"

export const Testimonials = () =>{
    return(
        <section className="section" id="testimonials">
        <div className="container">
            {/* ***** Section Title Start ***** */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="center-heading">
                        <h2 className="section-title">Que dicen los Psicologos</h2>
                    </div>
                </div>
                <div className="offset-lg-3 col-lg-6">
                    <div className="center-text">
                        {/* <p>Donec tempus, sem non rutrum imperdiet, lectus orci fringilla nulla, at accumsan elit eros a turpis. Ut sagittis lectus libero.</p> */}
                    </div>
                </div>
            </div>
            {/* ***** Section Title End ***** */}

            <div className="row">
                {/* ***** Testimonials Item Start ***** */}
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="team-item">
                        <div className="team-content">
                            <i class="fa-regular fa-comments"></i>
                            <p>"Tus elecciones sostendrán la vida que deseas, tu escoge a que le darás fuerza"</p>
                            <div className="user-image">
                                <img src={hiro} alt=""/>
                            </div>
                            <div className="team-info">
                                <h3 className="user-name">Hiromi Suárez</h3>
                                <span>Psicologa Clinica</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ***** Testimonials Item End ***** */}
                
                {/* ***** Testimonials Item Start ***** */}
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="team-item">
                        <div className="team-content">
                            <i class="fa-regular fa-comments"></i>
                            <p>"No hay mejor Terapia que un Horno Aleman"</p>
                            
                            <div className="user-image">
                                <img src={adam} alt=""/>
                            </div>
                            <div className="team-info">
                                <h3 className="user-name">Adam Bock</h3>
                                <span>Psicologo Clinico</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ***** Testimonials Item End ***** */}
                
                {/* ***** Testimonials Item Start ***** */}
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="team-item">
                        <div className="team-content">
                            <i class="fa-regular fa-comments"></i>
                            <p>Quisque diam odio, maximus ac consectetur eu, auctor non lorem. Cras quis est non ante ultrices molestie. Ut vehicula et diam at aliquam.</p>
                            <div className="user-image">
                                <img src="http://placehold.it/60x60" alt=""/>
                            </div>
                            <div className="team-info">
                                <h3 className="user-name">David Martin</h3>
                                <span>Website Manager</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ***** Testimonials Item End ***** */}
            </div>
        </div>
    </section>
    )
}