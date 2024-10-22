import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import "../../styles/jumbotron.css"
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export const Contactos = () => {
  const { actions, store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [psicologo, setPsicologo] = useState([]);
  const navigate = useNavigate();
  

  
  useEffect(() => {
        
    const fetchData = async() =>{
      setIsLoading(true)
      try{
          const data = await actions.get_psicologo_asigned();
          setPsicologo(store.userRelationShip)
      } catch (error) {
          console.error(error); // Handle any errors
        } finally {
          setIsLoading(false); // Finalizar la carga
      }

  }
  fetchData()
  }, []);

  function handleClick(url) {
    console.log(url)
    navigate(`/Perfil/${url}`);
    }


  return (
    <>
      <div className="content-wrapper">
        <h1 className="subtitulo p-4 h1">Contactos</h1>
      <div className="mb-4">
      {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
        <div>
           {!store.userRelationShip.length == 0 ? <div className="row">
                  {psicologo.map((psico, index) => (
                  <div className="p-4" key={index}>
                    <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none"
                  >
                    <Image
                      alt="Woman listing to music"
                      className="object-cover"
                      height={250}
                      width={250}
                      src={psico.profile_picture
                        ? psico.profile_picture
                        : psicologo_img}
                    />
                    <CardFooter className="justify-between before:bg-a/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">{psico.name} {psico.last_name}</p>
                      <Button className="text-tiny text-white bg-black/20" onClick={() => handleClick(psico.id)} variant="flat" color="default" radius="lg" size="sm">
                        Expediente
                      </Button>
                    </CardFooter>
                  </Card>
                   

                  </div>
                  ))}
            </div> : "selecciona un psicologo"}
        </div>
        )}
        </div>
      </div>
    </>
  );
};
