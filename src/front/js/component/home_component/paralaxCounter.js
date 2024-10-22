import React from "react";


export const ParalaxCounter = () =>{
    return(
        <section className="counter">
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item decoration-bottom">
                            <strong>126</strong>
                            <span>Psicologos</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item decoration-top">
                            <strong>63</strong>
                            <span>Clientes</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item decoration-bottom">
                            <strong>18</strong>
                            <span>Organizaciones</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item">
                            <strong>27</strong>
                            <span>Paises</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}