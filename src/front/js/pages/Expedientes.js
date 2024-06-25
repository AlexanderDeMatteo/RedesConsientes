import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export const Expedientes = () => {
  const { actions, store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  console.log(store.userDataSelecionado)
  console.log(patients)

  function handleClick(url) {
    console.log(url)
    navigate(`/Expedientes/${url}`);
    }

  
  useEffect(() => {
        
    const fetchData = async() =>{
      setIsLoading(true)
      
      try{
          const data = await actions.handle_patient_data();
          console.log(data, "data")
      } catch (error) {
          console.error(error); // Handle any errors
        } finally {
          setIsLoading(false); // Finalizar la carga
      }

  }
  fetchData()
  }, []);

  useEffect(() => {
    setPatients(store.userPatients);
  }, [store.userPatients]);

  return (
    <>
      <div className="content-wrapper">
        <div>
          <h1>
            Expedientes
          </h1>
        </div>
      {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
        <div>
          {patients.length === 0 ? "no hay expedientes disponibles" :
            <div className="row">
                  {patients.map((patient, index) => (
                  <div className=" p-3" key={index}>
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none"
                  >
                    <Image
                      alt="Woman listing to music"
                      className="object-cover"
                      height={200}
                      src={patient.profile_picture
                        ? patient.profile_picture
                        : psicologo_img}
                      width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">{patient.name} {patient.last_name}</p>
                      <Button className="text-tiny text-white bg-black/20" onClick={() => handleClick(patient.id)} variant="flat" color="default" radius="lg" size="sm">
                        Expediente
                      </Button>
                    </CardFooter>
                  </Card>

                  </div>
                  
                  ))}
            </div>}
        </div>
        )}
      </div>
    </>
  );
};
