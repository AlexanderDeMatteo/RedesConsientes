import React, { useState, useContext, useEffect } from "react";
import {Textarea} from "@nextui-org/react";
import Imager from "../consulta.jpg";
import Imager1 from "../consulta2.jpg";
import Imager3 from "../consulta3.jpeg";
import Imager4 from "../consulta4.jpg";
import {Button} from "@nextui-org/react";
import { Context } from "../../../store/appContext";


export const InfoTab = () => {
const [show, setShow] = useState(true);
const { actions, store } = useContext(Context);
const API_URL = process.env.BACKEND_URL;

    function Editar() {
        if (!show) {
          guardar();
        }
        setShow((wasShow) => !wasShow);
      }
    
      const guardar = async () => {
        // Create a copy of user data without role_id
        const userDataCopy = { ...store.userData };
        delete userDataCopy.role_id;
      
        const response = await fetch(`${API_URL}/api/user-profile`, {
          method: "PUT",
          body: JSON.stringify(userDataCopy),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      
        if (response.ok) {
          alert("datos actualizados");
          // actions.handle_user_data();
        }
      };

      function handleChange(event) {
   
        actions.handle_edit(event.target.value, event.target.name);
        
      }

      useEffect(() => {
        const fetchData = async() =>{
          setIsLoading(true)
          try{
              // const data = await actions.handle_user_data();
    
          } catch (error) {
              console.error(error); // Handle any errors
            } finally {
              setIsLoading(false); // Finalizar la carga
          }
    
      }
      fetchData()
    
      }, []);

  return (
    <>
        <div>
            <div className="pb-3">
                <p>Estrategia Terapeutica</p>
            </div>
            <> {!show ? 
            <Textarea
            name="psych_strategies"
            onChange={handleChange}
            label=""
            placeholder="Estrategia Terapeutica o enfoque terapeutico"
            className={{fullWidth:"true"}}
            value={store.userData.psych_strategies || ""}
            />
          : <Textarea
          isDisabled
          label=""
          labelPlacement="outside"
          placeholder="Estrategia Terapeutica o enfoque terapeutico"
          value={!store.userData.psych_strategies ? "Estrategia Terapeutica o enfoque terapeutico" : store.userData.psych_strategies}
          className="max-w-xs"
        />}
            </>
            <div className="row mb-3 mt-3">
                                <div className="col-sm-6">
                                  <img className="img-fluid" src={Imager} alt="Photo" />
                                </div>

                                <div className="col-sm-6">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <img className="img-fluid mb-3" src={Imager1} alt="Photo" />
                                      <img className="img-fluid mb-3" src={Imager3} alt="Photo" />
                                    </div>

                                    <div className="col-sm-6">
                                      <img className="img-fluid mb-3" src={Imager3} alt="Photo" />
                                      <img className="img-fluid mb-3" src={Imager4} alt="Photo" />
                                    </div>

                                  </div>

                                </div>

                              </div>

        </div>
        <div className="pb-3">
            <p>Experiencia Terapeutica</p>
        </div>
        <> {!show ? 
            <Textarea
            name="PsychExperiences"
            onChange={handleChange}
            label=""
            placeholder="introduce tu experiencia o enfoque terapeutico"
            className={{fullWidth:"true"}}
            value={store.userData.PsychExperiences || ""}
            />
          : <Textarea
          isDisabled
          label=""
          labelPlacement="outside"
          placeholder="Enter your description"
          value={!store.userData.PsychExperiences ? "introduce tu estrategiao enfoque terapeutico" : store.userData.PsychExperiences}
          className="max-w-xs"
        />}
         </>

    <div className="flex flex-wrap gap-4 justify-content-center mt-3">
    <Button color="primary" variant="shadow" type="submit"
                                  onClick={Editar}
                                  className="btn btn-danger">
        {!show ? "Guardar" : "Editar"}
      </Button> 
    </div>
    </>
  );
}