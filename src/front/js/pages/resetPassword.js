import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
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

export const ResetPassword = () => {


  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  
  
  const handleSubmit = (event) => {
    event.preventDefault()

    actions.resetPassword(email)
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
            <Tab title ="Recuperar contraseña" >
              <form className="flex flex-col gap-4 ">
                <Input 
                  isRequired 
                  label="Email" 
                  placeholder="ingresa tu correo"
                  value={email} 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => {
                    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    if (regex.test(email)) {
                    setErrors({ ...errors, email: false });
                    } else {
                    setErrors({ ...errors, email: true });
                    }
                  }}
                />
        
                <div className="flex gap-2 justify-end">
                  <Button 
                    fullWidth 
                    className="main-button"
                    onClick={handleSubmit} 
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
