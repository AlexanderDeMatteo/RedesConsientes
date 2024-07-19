import React, { useState } from "react";
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

export const LoginSiginUp = () => {
  const [selected, setSelected] = React.useState("Inicia Sesion");
  const [show, setShow] = useState(false);

  return (
    <div className=" max-w-full max-h-full h-auto justify-content-center flex ">
      <Card id="card" className="w-auto h-auto m-2 ">
        <CardBody className=" ">
          <Image src="https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-dia-mundial-salud-mental_23-2149664792.jpg?t=st=1718861213~exp=1718864813~hmac=472f6c611b046bfb370ae4aa1c8d6a1022ee8e82b6ced3654dbb00ad6ca14581&w=740" />
        </CardBody>
        <CardBody className=" h-auto">
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
                <Input isRequired label="Nombre" placeholder="Ingresa tu nombre" type="text" />
                <Input isRequired label="Apellido" placeholder="Ingresa tu apellido" type="text" />
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
                <Checkbox defaultSelected isSelected={show} onClick={() => setShow(!show)}>
                  Eres Psicologo?
                </Checkbox>
                {show && ( // Use logical AND for conditional rendering
                  <Input isRequired label="Numero de federado" placeholder="Ingresa tu numero de FPV" type="number" />
                )}

                <Checkbox defaultSelected isSelected={false}>Acepto los terminos y condiciones del contrato</Checkbox>

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
