import React, { useState, useContext, useEffect } from "react";
import {Button, Input, DateInput, Select, SelectItem, Avatar} from "@nextui-org/react";
import { Context } from "../../../store/appContext";


export const NetworkTab = () => {
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
      <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <>
          { !show ? <Input
          type="text"
          onChange={handleChange}
          name="Tiktok"
          label="Tiktok"
          placeholder="Ingresa tu usuario de Tiktok"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-tiktok"></i>
          }
          />:
          <Input
          isDisabled
          type="text"
          onChange={handleChange}
          name="Tiktok"
          label="Tiktok"
          placeholder="Ingresa tu usuario de Tiktok"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-tiktok"></i>
          }
          />
          }
          
        </>
        <>
          {!show ?<Input
          type="text"
          onChange={handleChange}
          name="Facebook"
          label="Facebook"
          placeholder="Ingresa tu usuario de Facebook"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-square-facebook"></i>
          }
          />:
          <Input
          isDisabled
          type="text"
          onChange={handleChange}
          name="Facebook"
          label="Facebook"
          placeholder="Ingresa tu usuario de Facebook"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-square-facebook"></i>
          }
          />}
          
        </>
        <>
          {!show ? <Input
          type="text"
          onChange={handleChange}
          name="Instagram"
          label="Instagram"
          placeholder="Ingresa tu usuario de Instagram"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-instagram"></i>
          }
          />:
          <Input
          isDisabled
          type="text"
          onChange={handleChange}
          name="Instagram"
          label="Instagram"
          placeholder="Ingresa tu usuario de Instagram"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-instagram"></i>
          }
          />}
          
        </>
        <>

          {!show ? <Input
          type="text"
          onChange={handleChange}
          name="Linkedin"
          label="Linkedin"
          placeholder="Ingresa el usuario de Linkedin"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-linkedin"></i>
          }
          /> :
          <Input
          isDisabled
          type="text"
          onChange={handleChange}
          name="Linkedin"
          label="Linkedin"
          placeholder="Ingresa el usuario de Linkedin"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-linkedin"></i>
          }
          />}
          
        </>
        <>
          {!show ? <Input
          type="text"
          onChange={handleChange}
          name="X"
          label="X"
          placeholder="Ingresa tu usuario de X"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-square-x-twitter"></i>
          }
          /> : 
          <Input
          isDisabled
          type="text"
          onChange={handleChange}
          name="X"
          label="X"
          placeholder="Ingresa tu usuario de X"
          labelPlacement="outside"
          startContent={
            <i class="fa-brands fa-square-x-twitter"></i>
          }
          />}
          
        </>

          
            </div>
    </div>   

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