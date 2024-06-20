import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import psicologo_img from "../component/perfil_componentes/psicologo.png";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export const Noticias = () => {
  const { actions, store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [psicologo, setPsicologo] = useState([]);

  

  
  useEffect(() => {
        
    const fetchData = async() =>{
      setIsLoading(true)
      try{
          const data = await actions.get_psicologo_asigned();
          setPsicologo(store.userRelationShip)
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
    <div className="content-wrapper">

    <div>
      <h1 className=" p-4 h1 ">Noticias</h1>
    </div>
    <div className="mb-4">

      <div className="max-w-[100%] gap-2 grid grid-cols-12 grid-rows-2 px-8">
    {/* <Card className="col-span-12 sm:col-span-4 h-[300px]">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">What to watch</p>
        <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://nextui.org/images/card-example-4.jpeg"
        />
        </Card> */}
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-3">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/foto-gratis/representacion-cerebro-humano-como-planta-o-arbol-maceta_23-2150936873.jpg?t=st=1718861056~exp=1718864656~hmac=110ecc6bf8a342572518e7408be051ef39ab77d117e6b58b0649107530c053c2&w=740"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/foto-gratis/libros-cerebro-estilo-arte-digital-dia-educacion_23-2151164350.jpg?t=st=1718861102~exp=1718864702~hmac=f0c493d1bab870e694e794b8517126a49133fa730ea3a6b6295a56a264b70cb3&w=740"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/foto-gratis/bodegon-cerebros-humanos-regadera_23-2150547704.jpg?t=st=1718861162~exp=1718864762~hmac=df01391e340551906fcdd6c0b7fc524be8464dc2ccfed94e21fec556d8fdc246&w=360"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
    {/* <Card className="col-span-12 sm:col-span-4 h-[300px]">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
      <p className="text-tiny text-primary-800/80 uppercase font-bold">Supercharged</p>
      <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
      </CardHeader>
      <Image
      removeWrapper
      alt="Card background"
      className="opacity-1 z-0 w-full h-full object-cover"
      src="https://nextui.org/images/card-example-2.jpeg"
      />
      </Card> */}
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-dia-mundial-salud-mental_23-2149664792.jpg?t=st=1718861213~exp=1718864813~hmac=472f6c611b046bfb370ae4aa1c8d6a1022ee8e82b6ced3654dbb00ad6ca14581&w=740"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/vector-gratis/concepto-funciones-cerebrales-representacion-simbolica-infografica-logica-lado-izquierdo-ciencia-matematica-artes-correctas-creatividad_1284-29036.jpg?t=st=1718861329~exp=1718864929~hmac=722fd6d10e7981c57d0c44b50c469f2496fb09c01202f7bab205743197402cf2&w=740"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
    {/* <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Your day your way</p>
        <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://nextui.org/images/card-example-5.jpeg"
        />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="opacity-1 z-0 rounded-full w-10 h-11 bg-black"
            src="https://nextui.org/images/breathing-app-icon.jpeg"
            />
          <div className="flex flex-col">
            <p className="text-tiny text-primary-800/80">Breathing App</p>
            <p className="text-tiny text-primary-800/80">Get a good night's sleep.</p>
          </div>
        </div>
        <Button radius="full" size="sm">Get App</Button>
      </CardFooter>
    </Card> */}
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-3">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/foto-gratis/vista-superior-concepto-psicologo-linea_23-2149407921.jpg?t=st=1718861273~exp=1718864873~hmac=08990d9c7b202bc22ade5b5c1df5a863bf6ae17fb78af60644b3877fa16614f9&w=740"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/foto-gratis/representacion-cerebro-humano-como-planta-o-arbol-maceta_23-2150936855.jpg?t=st=1718861382~exp=1718864982~hmac=630c8c477bca9bd6246871a3d473ec4c293babfb7154b769593c64848efde5c5&w=740"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-primary-800/80 uppercase font-bold">Nueva</p>
        <h4 className="text-black font-medium text-2xl">Actualizacion</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="opacity-1 z-0 w-full h-full object-cover"
        src="https://img.freepik.com/foto-gratis/estructura-detallada-cerebro-humano_23-2150930036.jpg?t=st=1718861412~exp=1718865012~hmac=6d0891bc16a3f1a6e16fbf681e8738bef8fd32d65b718720c1f20a0af6845db2&w=740"
        />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Fecha:</p>
          <p className="text-black text-tiny">Titulo:</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Mostrar más
        </Button>
      </CardFooter>
    </Card>
  </div>
            </div>
  </div>
    </>
  );
};
