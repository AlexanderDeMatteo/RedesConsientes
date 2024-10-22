import React from "react";
import img from "../../img/9100913.jpg"
import {Image} from "@nextui-org/react";


export const AboutUs = () =>{
    return(
        <div className=" column col-12 p-3">
            
            <div className="d-flex row col-12 p-3">

                <div className="col-6 p-5"> 

                    <h1><strong>Sobre Nosotros</strong></h1>
                    {/* <hr className=" border border-primary border-3 opacity-75"/> */}
                    <br></br>
                    <p className="">De la teoría a la práctica. Desde las aulas universitarias hasta el desarrollo de software, hemos recorrido un largo camino. Nuestra plataforma es el resultado de años de investigación, desarrollo y pasión por la psicología.</p>

                    <br></br>
                    <h2><strong>Nuestra visión:</strong></h2>
                    <br></br>
                    <p> Crear una comunidad de psicólogos comprometidos con la excelencia, donde puedan compartir conocimientos, colaborar en proyectos y ofrecer servicios de alta calidad a sus pacientes.</p>
                    <br></br>
                    <h2><strong>Nuestra misión:</strong></h2>
                    <br></br>
                    <p> Empoderar a los psicólogos con herramientas tecnológicas innovadoras para transformar vidas y mejorar la salud mental de las personas.</p>
                    <br></br>

                    <p><strong></strong></p>
                </div>

                <div className="col-6 p-5">
                    {/* <img src={img} ></img> */}
                    <Image
                        isZoomed
                        width={800}
                        // height={700}
                        alt="NextUI Fruit Image with Zoom"
                        src={img}
                        shadow="md"
                    />
                </div>
            </div>

            {/* <div className="d-flex justify-content-center">
                <h2><strong>Nuestros valores</strong></h2>
            </div>
            <br></br>
            <div className=" d-flex row justify-content-around">
                <div className=" col-2 " >
                    <h1><strong>01</strong> Colaboración</h1>
                    <br></br>
                    <p>Trabajamos juntos para alcanzar objetivos comunes.</p>
                </div>
                <br></br>
                <div className="col-2 " >
                    <h1><strong>02 </strong> Innovación</h1>
                    <br></br>
                    <p>Estamos siempre buscando nuevas formas de mejorar nuestros</p>
                </div>
                <br></br>
                <div className=" col-2" >
                    <h1><strong>03 </strong> Calidad</h1>
                    <br></br>
                    <p>Ofrecemos herramientas y recursos de la más alta calidad.</p>
                </div>
                <br></br>
                <div className="col-2 " >
                    <h1><strong>04 </strong> Accesibilidad</h1>
                    <br></br>
                    <p>Queremos que la salud mental sea accesible para todos.</p>
                </div>
                <br></br>
                
            </div> */}


        </div>
    )
}