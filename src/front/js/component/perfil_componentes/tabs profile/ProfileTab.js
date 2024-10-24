import React, { useState, useContext, useEffect } from "react";
import {Button, Input, DateInput, Select, SelectItem, Avatar, user} from "@nextui-org/react";
import {CalendarDate, parseDate} from "@internationalized/date";
import { Context } from "../../../store/appContext";


export const ProfileTab = (data) => {
const [show, setShow] = useState(true);
const { actions, store } = useContext(Context);
const API_URL = process.env.BACKEND_URL;
const [isLoading, setIsLoading] = useState(false);
const [fecha, setFecha] = useState("")

const genero = ["Masculino", "Femenino", "otros"]
// const date = new CalendarDate(1993,10,8)

console.log(data.user_data == undefined)

const birthDate1 = store.userData.day && store.userData.month && store.userData.year 
    ? new CalendarDate(store.userData.year,store.userData.year, store.userData.month, store.userData.day) 
    : null;
const birthDate2 = data.user_data == undefined
    ? null 
    : data.user_data.year && data.user_data.month && data.user_data.year 
    ? new CalendarDate(data.user_data.year,data.user_data.year, data.user_data.month, data.user_data.day)
    :null




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

        console.log(fecha)
        userDataCopy["day"] = fecha.day
        userDataCopy["month"] = fecha.month
        userDataCopy["year"] = fecha.year
      
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
          type="dni"
          onChange={handleChange}
          name="dni"
          label="Cedula"
          placeholder="ingresa tu cedula"
          labelPlacement="outside"
          startContent={
            <i class="fa-solid fa-address-card"></i>
          }
          />
          : <Input
          isDisabled
          type="dni"
          onChange={handleChange}
          name="dni"
          label="Cedula"
          placeholder="ingresa tu cedula"
          labelPlacement="outside"
          value={data.user_data ? data.user_data.dni : store.userData.dni}
          startContent={
            <i class="fa-solid fa-address-card"></i>
          }
          />}
        </>
        <>{!show ?
          <DateInput
          name="dob"
          onChange={setFecha}
          label= <strong>Fecha de nacimiento</strong>
          // className="m-0"
          // defaultValue={} 
          // placeholderValue={new CalendarDate(1995, 11, 6)} 
          startContent={
            <i class="fa-solid fa-calendar-days"></i>
          }
          />
          : <DateInput
          isDisabled
          name="dob"
          // onChange={handleChange}
          label= <strong>Fecha de nacimiento</strong>
          // className="m-0"
          // value={store.userData.dob}
          value={ data.user_data ? birthDate2 : birthDate1} 
          // value={birthDate1} 
          // placeholderValue={prueba} 
          labelPlacement="outside"
          startContent={
            <i class="fa-solid fa-calendar-days"></i>
          }
          /> }
        </>
    <> {!show ?
    <Select
      name="gender"
      onChange={handleChange}
      className="max-w-xs junstify-content-center"
      label="Genero"
      placeholder="Selecciona"
    >
      <SelectItem
        key="Masculino"
        startContent={<i class="fa-solid fa-mars"></i>}
        >
        Masculino
      </SelectItem>
      <SelectItem
        key="Femenino"
        startContent={<i class="fa-solid fa-venus"></i>}
        >
        Femenino
      </SelectItem>
      <SelectItem
        key="otro"
        startContent={<i class="fa-solid fa-transgender"></i>}
      >
        Otro
      </SelectItem>
    </Select>
    :
    <Select
      isDisabled
      name="gender"
      onChange={handleChange}
      className="max-w-xs junstify-content-center"
      label="Genero"
      placeholder={store.userData.gender ? store.userData.gender : "Selecciona" }
    >
      
    </Select>}
    </>
        <>
        {!show ?
          <Input
            name="phone_number"
            onChange={handleChange}
            type="number"
            label="Numero Telefonico"
            placeholder="ingresa tu numero telefonico"
            labelPlacement="outside"
            startContent={
              <i class="fa-solid fa-mobile-screen-button"></i>
            }
          />
          :
          <Input
            isDisabled
            name="phone_number"
            type="number"
            label="Numero Telefonico"
            placeholder="ingresa tu numero telefonico"
            labelPlacement="outside"
            value={store.userData.phone_number ? store.userData.phone_number : "" }
            startContent={
              <i class="fa-solid fa-mobile-screen-button"></i>
            }
          />}
        </>
        <>
          {!show ? 
            <Input
            name="state"
            onChange={handleChange}
            type="state"
            label="Estado"
            placeholder="ingresa el estado donde reside"
            labelPlacement="outside"
            startContent={
              <i class="fa-solid fa-earth-americas"></i>
            }
            />
          : <Input
          isDisabled
          name="state"
          onChange={handleChange}
          type="state"
          label="Estado"
          placeholder="ingresa el estado donde reside"
          labelPlacement="outside"
          value={ data.user_data ? data.user_data.state : store.userData.state}
          startContent={
            <i class="fa-solid fa-earth-americas"></i>
          }
          />}
        </>
        <>{
          !show ?
          <Input
              name="city"
              onChange={handleChange}
              type="city"
              label="Ciudad"
              placeholder="ingresa la ciudad donde reside"
              labelPlacement="outside"
              startContent={
                <i class="fa-solid fa-map-location-dot"></i>
              }
            />
            :
            <Input
              isDisabled
              name="city"
              onChange={handleChange}
              type="city"
              label="Ciudad"
              placeholder="ingresa la ciudad donde reside"
              labelPlacement="outside"
              value={data.user_data ? data.user_data.city : store.userData.city}
              startContent={
                <i class="fa-solid fa-map-location-dot"></i>
              }
            />

        }
        </>
            </div>
    </div>   

    {data.user_data ? " " : 
    <div className="flex flex-wrap gap-4 justify-content-center mt-3">
    <Button id="button" variant="shadow" type="submit"
                                  onClick={Editar}
                                  className="btn btn-danger">
        {!show ? "Guardar" : "Editar"}
      </Button> 
    </div>
                                  }
        </>
  );
}