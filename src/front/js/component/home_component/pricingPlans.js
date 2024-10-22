import React from "react";
import "../../../styles/jumbotron.css"

export const PrincingPlans = () =>{
    return(
        <section className="section colored" id="pricing-plans">
        <div className="container">
            {/* ***** Section Title Start ***** */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="center-heading">
                        <h2 className="section-title titulo">Plan de Pagos</h2>
                    </div>
                </div>
                <div className="offset-lg-3 col-lg-6">
                    <div className="center-text">
                        <p className="cuerpoTexto">Contrata ahora y empieza a disfrutar de todas las ventajas.</p>
                    </div>
                </div>
            </div>
            {/* ***** Section Title End ***** */}

            <div className="row">
                {/* ***** Pricing Item Start ***** */}
                <div className="col-lg-4 col-md-6 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                    <div className="pricing-item">
                        <div className="pricing-header">
                            <h3 className="pricing-title">Prueba</h3>
                        </div>
                        <div className="pricing-body">
                            <div className="price-wrapper">
                                <span className="currency"></span>
                                <span className="price">Free</span>
                                <span className="period"></span>
                            </div>
                            <ul className="list">
                            <li className="active">250 GB space</li>
                                <li className="active">5000 GB transfer</li>
                                <li className="active">Pro Design Panel</li>
                                <li className="active">15-minute support</li>
                                <li className="active">Unlimited Emails</li>
                                <li className="active">24/7 Security</li>
                            </ul>
                        </div>
                        <div className="pricing-footer">
                            <a href="#" className="main-button">Purchase Now</a>
                        </div>
                    </div>
                </div>
                {/* ***** Pricing Item End ***** */}

                {/* ***** Pricing Item Start ***** */}
                <div className="col-lg-4 col-md-6 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                    <div className="pricing-item active">
                        <div className="pricing-header">
                            <h3 className="pricing-title titulo">Estandar</h3>
                        </div>
                        <div className="pricing-body">
                            <div className="price-wrapper">
                                <span className="currency">$</span>
                                <span className="price">10.00</span>
                                <span className="period">mensual</span>
                            </div>
                            <ul className="list">
                                <li className="active">120 GB space</li>
                                <li className="active">1200 GB transfer</li>
                                <li className="active">Pro Design Panel</li>
                                <li className="active">15-minute support</li>
                                <li>Unlimited Emails</li>
                                <li>24/7 Security</li>
                            </ul>
                        </div>
                        <div className="pricing-footer">
                            <a href="#" className="main-button">Purchase Now</a>
                        </div>
                    </div>
                </div>
                {/* ***** Pricing Item End ***** */}

                {/* ***** Pricing Item Start ***** */}
                <div className="col-lg-4 col-md-6 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                    <div className="pricing-item">
                        <div className="pricing-header">
                            <h3 className="pricing-title titulo">Premium</h3>
                        </div>
                        <div className="pricing-body">
                            <div className="price-wrapper">
                                <span className="currency">$</span>
                                <span className="price">15.00</span>
                                <span className="period">mensual</span>
                            </div>
                            <ul className="list">
                                <li className="active">250 GB space</li>
                                <li className="active">5000 GB transfer</li>
                                <li className="active">Pro Design Panel</li>
                                <li className="active">15-minute support</li>
                                <li className="active">Unlimited Emails</li>
                                <li className="active">24/7 Security</li>
                            </ul>
                        </div>
                        <div className="pricing-footer">
                            <a href="#" className="main-button">Purchase Now</a>
                        </div>
                    </div>
                </div>
                {/* ***** Pricing Item End ***** */}
            </div>
        </div>
    </section>
    )
}