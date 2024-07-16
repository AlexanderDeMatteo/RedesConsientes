import React, { useState } from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Checkbox, Image} from "@nextui-org/react";

export const LoginSiginUp  = () => {
  const [selected, setSelected] = React.useState("Inicia Sesion");
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col-12 w-full justify-content-center mt-2">
        
      <Card className="max-w-full flex-row w-[400px] h-[650px] justify-content-center">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="Inicia Sesion" title="Inicia Sesion">
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Necesitas registrarte?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Registrate
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Inicia Sesion
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Registrate">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Nombre" placeholder="Ingresa tu nombre" type="password" />
                <Input isRequired label="Apellido" placeholder="Ingresa tu apellido" type="password" />
                <Input isRequired label="Email" placeholder="Ingresa tu email" type="email" />
                <Input
                  isRequired
                  label="Contraseña"
                  placeholder="Introduce una contraseña"
                  type="password"
                />
                <Input
                  isRequired
                  label="Repetir-contraseña"
                  placeholder="Repite la contraseña"
                  type="password"
                />
                <Checkbox defaultSelected isSelected={show} onClick={()=> {show == false ? setShow(true) : setShow(false)}}>Eres Psicologo?</Checkbox>
                {show == true ? 
                <Input isRequired label="Numero de federado" placeholder="Ingresa tu numero de FPV" type="number" />
                : ""}

                <Checkbox defaultSelected isSelected={false}>acepto los terminos y condiciones del contrato</Checkbox>
                

                <p className="text-center text-small">
                  Ya tienes una cuenta?{" "}
                  <Link size="sm" onPress={() => setSelected("Inicia Sesion")}>
                    Inicia Sesion
                  </Link>
                </p>

                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Registrate
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
