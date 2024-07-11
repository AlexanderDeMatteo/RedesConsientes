import React, { useState, useContext, useEffect } from "react";
import {Button, Input, DateInput, Select, SelectItem, Avatar} from "@nextui-org/react";
import { Context } from "../../../store/appContext";


export const ProfesionalProfileTab = () => {
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
        <>{!show ? 
          <Input
          type="text"
          onChange={handleChange}
          name="education"
          label="Educacion"
          placeholder="Ingresa donde estudiaste"
          labelPlacement="outside"
          startContent={
            <i class="fa-solid fa-user-graduate"></i>
          }
          />
          :<Input
          isDisabled
          type="text"
          onChange={handleChange}
          name="education"
          label="Educacion"
          placeholder="Ingresa donde estudiaste"
          labelPlacement="outside"
          startContent={
            <i class="fa-solid fa-user-graduate"></i>
          }
          value={store.userData.education}
          />}
        </>
          <> {!show ?
          <Select
            name="specialty_area"
            onChange={handleChange}
            className="max-w-full junstify-content-center"
            label="Area de especialidad"
            placeholder="Selecciona"
          >
            <SelectItem
              key="Neuro Psicología"
              startContent={<i class="fa-solid fa-brain"></i>}
              >
              Neuro Psicología
            </SelectItem>
            <SelectItem
              key="Psicología Clinica"
              startContent={<i class="fa-solid fa-brain"></i>}
              >
              Psicología Clinica
            </SelectItem>
            <SelectItem
              key="Psicólogia Biológica"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicólogia Biológica
            </SelectItem>
            <SelectItem
              key="Psicología Comparativa o Etiología"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Comparativa o Etiología
            </SelectItem>
            <SelectItem
              key="Psicología Educativa"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Educativa
            </SelectItem>
            <SelectItem
              key="Psicología Evolutiva"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Evolutiva
            </SelectItem>
            <SelectItem
              key="Psicología del Deporte"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología del Deporte
            </SelectItem>
            <SelectItem
              key="Psicología Jurídica"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Jurídica
            </SelectItem>
            <SelectItem
              key="Psicología de la Personalidad"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología de la Personalidad
            </SelectItem>
            <SelectItem
              key="Psicología de la Salud"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología de la Salud
            </SelectItem>
            <SelectItem
              key="Psicología de Parejas"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología de Parejas
            </SelectItem>
            <SelectItem
              key="Psicología Familiar"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Familiar
            </SelectItem>
            <SelectItem
              key="Psicología Empresarial y Organizacional"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Empresarial y Organizacional
            </SelectItem>
            <SelectItem
              key="Psicología Militar"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Militar
            </SelectItem>
            <SelectItem
              key="Psicología Escolar"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Escolar
            </SelectItem>
            <SelectItem
              key="Psicología Gerontológica"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Gerontológica
            </SelectItem>
            <SelectItem
              key="Psicología Experimental"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Experimental
            </SelectItem>
            <SelectItem
              key="Psicología Del Desarrollo"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología Del Desarrollo
            </SelectItem>
            <SelectItem
              key="Psicología de Ingeniería"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología de Ingeniería
            </SelectItem>
            <SelectItem
              key="Psicología del Marketing"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología del Marketing
            </SelectItem>
            <SelectItem
              key="Sexología"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Sexología
            </SelectItem>
            <SelectItem
              key="Psicología comunitaria"
              startContent={<i class="fa-solid fa-brain"></i>}
            >
              Psicología comunitaria
            </SelectItem>
          </Select>
          :
          <Select
            isDisabled
            name="specialty_area"
            onChange={handleChange}
            className="max-w-full junstify-content-center"
            label="Area de especialidad"
            placeholder={store.userData.specialty_area ? store.userData.specialty_area : "Selecciona" }
          >
            
          </Select>}
          </>
        <>{!show ? 
          <Input
          className="max-w-xs"
          onChange={handleChange}
          name="monto_consulta"
          type="number"
          label="Price"
          placeholder="0.00"
          labelPlacement="outside"
          startContent={
            <i class="fa-solid fa-hand-holding-dollar"></i>
          }
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$USD</span>
            </div>
          }
        />
          : <Input
          isDisabled
          className="max-w-xs"
          onChange={handleChange}
          name="monto_consulta"
          type="number"
          label="Price"
          placeholder={store.userData.monto_consulta ? store.userData.monto_consulta : "0.00"}
          labelPlacement="outside"
          startContent={
            <i class="fa-solid fa-hand-holding-dollar"></i>
          }
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$USD</span>
            </div>
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