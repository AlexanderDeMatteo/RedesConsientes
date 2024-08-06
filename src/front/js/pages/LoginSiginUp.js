import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
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
  const [check_fpv, setCheck_fpv] = useState(false);
  const [check, setCheck] = useState(false);
  const [isVisible1, setIsVisible1] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [isVisible3, setIsVisible3] = React.useState(false);
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [numero_fpv, setNumero_fpv] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    repeat: false,
  });
  
  const navigate = useNavigate();
  const passwordVisibilityLogin = () => setIsVisible1(!isVisible1);
  const passwordVisibilityRegister = () => setIsVisible2(!isVisible2);
  const passwordVisibilityReRegister = () => setIsVisible3(!isVisible3);
  
  const handlelogin = async () => {
      let data = {
          email: email,
          password: password,
      };
      if (await actions.loginUser(data)) {
          if(data.admin == true){
              navigate("/panel");
          }else{
              navigate("/Perfil");
          }
      } else {
          alert("Credenciales Invalidas");
      }
  };

  const handleSubmit = async () => {
		let data = {};

		if (check_fpv) {

			data.name = name,
      data.last_name = lastname,
				data.email = email,
				data.password = password,
				data.fpv_number = numero_fpv,
				data.is_psicologo = check_fpv
		} else {
			data.name = name,
      data.last_name = lastname,
				data.email = email,
				data.password = password,
				data.fpv_number = null,
				data.is_psicologo = check_fpv
		}

		if (await actions.registerUser(data)) {
			navigate("/Perfil");
		} else {

			alert("EL USUARIO YA ESTA CREADO INTENTE DE NUEVO");
		}
	};


  return (
    <div className=" max-w-full max-h-full h-auto justify-content-center flex ">
      <Card id="card" className="w-auto h-auto m-2 ">
        <CardBody className=" ">
          <Image src="https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-dia-mundial-salud-mental_23-2149664792.jpg?t=st=1718861213~exp=1718864813~hmac=472f6c611b046bfb370ae4aa1c8d6a1022ee8e82b6ced3654dbb00ad6ca14581&w=740" />
        </CardBody>
        <CardBody className=" ">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="Inicia Sesion" title="Inicia Sesion">
              <form className="flex flex-col gap-4">
                <Input 
                  isRequired 
                  label="Email" 
                  placeholder="Enter your email"
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

                <Input
                  isRequired
                  label="Password"
                  value={password}
                  placeholder="Enter your password"
                  type={isVisible1 ? "text" : "password"}
                  onBlur={(e) => {
                    let regex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
                    if (regex.test(password)) {
                        setErrors({ ...errors, password: false });
                    } else {
                        setErrors({ ...errors, password: true });
                    }
                }}
                    onChange={(e) => setPassword(e.target.value)} 
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={passwordVisibilityLogin} aria-label="toggle password visibility">
                        {isVisible1 ? (
                          <i class="fa-solid fa-eye"></i>
                        ) : (
                          <i class="fa-solid fa-eye-slash"></i>
                        )}
                      </button>
                    }
                    className="max-w-full"
                  />
            
                

                <p className="text-center text-small">
                  Necesitas registrarte?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Registrate
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button 
                    fullWidth color="primary" 
                    onClick={handlelogin} 
                    isDisabled={
                              errors.email ||
                              errors.password ||
                              !email.length > 0 ||
                              !password.length > 0
                              }>
                    Inicia Sesion
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Registrate">
              <form className="flex flex-col gap-4">
                <Input 
                  isRequired
                  value={name}
                  label="Nombre" 
                  placeholder="Ingresa tu nombre" 
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />

                <Input 
                  isRequired 
                  value={lastname}
                  label="Apellido" 
                  placeholder="Ingresa tu apellido" 
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}

                />

                <Input 
                  isRequired 
                  label="Email" 
                  value={email}
                  placeholder="Ingresa tu email" 
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
                {errors.email && (
														<div className="text-warning">
															Correo invalido perro de awa
														</div>
													)}

                <Input
                  isRequired
                  label="Contraseña"
                  value={password}
                  placeholder="Introduce una contraseña"
                  type={isVisible2 ? "text" : "password"}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={passwordVisibilityRegister} aria-label="toggle password visibility">
                      {isVisible2 ? (
                        <i class="fa-solid fa-eye"></i>
                      ) : (
                        <i class="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  }
                  onBlur={(e) => {
                    let regex =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (regex.test(password)) {
                      setErrors({ ...errors, password: false });
                    } else {
                      setErrors({ ...errors, password: true });
                    }
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
														<div className="text-warning">
															recuerda que debe tener al menos 8 caracteres 1
															letra minuscula 1 letra mayuscula 1 numero y un
															caracter especial perro
														</div>
													)}
                <Input
                  isRequired
                  label="Repetir-contraseña"
                  value={repeat}
                  placeholder="Repite la contraseña"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={passwordVisibilityReRegister} aria-label="toggle password visibility">
                      {isVisible3 ? (
                        <i class="fa-solid fa-eye"></i>
                      ) : (
                        <i class="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  }
                  onBlur={(e) => {
                    if (repeat !== password) {
                      setErrors({ ...errors, repeat: true });
                    } else {
                      setErrors({ ...errors, repeat: false });
                    }
                  }}
                  onChange={(e) => setRepeat(e.target.value)}
                  type={isVisible3 ? "text" : "password"}
                />
                {errors.repeat && (
														<div className="text-warning">
														La contraseña no coincide
														</div>
													)}
                <Checkbox defaultSelected isSelected={check_fpv} value={check_fpv} onClick={() => setCheck_fpv(!check_fpv)}>
                  Eres Psicologo?
                </Checkbox>
                {/* {check_fpv && ( // Use logical AND for conditional rendering
                  <Input 
                    isRequired 
                    label="Numero de federado" 
                    placeholder="Ingresa tu numero de FPV" 
                    type="number" 
                    onChange={(e) => setNumero_fpv(e.target.value)}
                  />
                )} */}
                {check_fpv ?
                  <Input 
                    isRequired 
                    label="Numero de federado" 
                    placeholder="Ingresa tu numero de FPV" 
                    type="number" 
                    onChange={(e) => setNumero_fpv(e.target.value)}
                    value={numero_fpv}
                  />
                  : ""
                }

                <Checkbox defaultSelected isSelected={check} onClick={() => setCheck(!check)}>Acepto los terminos y condiciones del contrato</Checkbox>

                <p className="text-center text-small">
                  Ya tienes una cuenta?{" "}
                  <Link size="sm" onPress={() => setSelected("Inicia Sesion")}>
                    Inicia Sesion
                  </Link>
                </p>

                <div className="flex gap-2 justify-end pb-3">
                  <Button 
                    fullWidth 
                    color="primary"
                    onClick={() => handleSubmit()}
                    isDisabled={
                      errors.email ||
                      errors.password ||
                      errors.repeat ||
                      !check ||
                      !name.length > 0 ||
                      !lastname.length > 0 ||
                      !email.length > 0 ||
                      !password.length > 0 ||
                      !repeat.length > 0
                    }
                  >
                    Registro
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
