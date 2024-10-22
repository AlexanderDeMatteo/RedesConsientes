import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext"; 
import { useSearchParams } from "react-router-dom"
import img from "../../img/rm373batch7-socialmedia-09.jpg"
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Image,
} from "@nextui-org/react";
import "../../styles/loginSiginup.css"

export const UpdateContraseña = () => {


  const { store, actions } = useContext(Context);
  const [newPass, setNewPass] = useState("");
  const [searchParams, _] = useSearchParams();
  const [errors, setErrors] = useState({
    newPass: false
  });
  
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = actions.updatePassword(searchParams.get("token"), newPass)
    alert("contraseña cambiada con exito!!")
    console.log(response)
}



  return (
    <div className="  justify-content-center flex ">
      <Card id="card" className=" w-[75%]  h-[100%] m-5">
        <CardBody >
          <Image src={img} />
        </CardBody>
        <CardBody className=" ">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
          >
            <Tab title ="Nueva Contraseña" >
              <form className="flex flex-col gap-4 ">
              <Input
                isRequired
                label="Password"
                value={newPass}
                placeholder="Ingresa la Nueva Contraseña"
                onChange={(event) => setNewPass(event.target.value)}
                lassName="max-w-full"
                onBlur={(e) => {
                  let regex =
                   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&\.])[A-Za-z\d@$!%*#?&\.]{8,}$/;
                  if (regex.test(newPass)) {
                      setErrors({ ...errors, newPass: false });
                  } else {
                      setErrors({ ...errors, newPass: true });
                  }
              }}
                />
                {errors.newPass && (
														<div className="" style={{color : "#2b1a6e"}}>
															recuerda que debe tener al menos 8 caracteres 1
															letra minuscula 1 letra mayuscula 1 numero y un
															caracter especial
														</div>
													)}
        
                <div className="flex gap-2 justify-end">
                  <Button 
                    fullWidth 
                    className="main-button"
                    onClick={handleSubmit} 
                    isDisabled={
                      errors.newPass ||
                      newPass.length < 8 
                    }
                    >
                    enviar
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
