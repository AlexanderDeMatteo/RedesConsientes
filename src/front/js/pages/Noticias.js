import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import psicologo_img from "../component/perfil_componentes/psicologo.png";

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
        <h1>Noticias</h1>
      {isLoading == true ? (<div className="d-flex justify-content-center"><div className="spinner-border text-primary m-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></div>) : (
        <div>
                  <div className="col-md-3">
                  <div className="card card-primary card-outline">
                      <div>
                        <p>Fecha</p>
                      <div className="text-center">
                        <p>titulo</p>
                      </div>
                      <h5 className="my-3 text-center">
                        <p>contenido</p>
                      </h5>

                      <p>Nombre</p>

                      </div>
                  </div>

                  </div>
                 
        </div>
        )}
      </div>

      <div class="flex flex-col overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none max-w-[300px] absolute left-[80px] -top-[80px] animate-[levitate_16s_ease_infinite] border-none" tabindex="-1">
      <div class="flex p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large justify-between">
      <div class="flex gap-5"><span tabindex="-1" class="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default"><img alt="Zoey Lang" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" class="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" srcset="/_next/image?url=%2Favatars%2Favatar-1.webp&amp;w=48&amp;q=75 1x, /_next/image?url=%2Favatars%2Favatar-1.webp&amp;w=96&amp;q=75 2x" src="/_next/image?url=%2Favatars%2Favatar-1.webp&amp;w=96&amp;q=75" style={{color: "transparent"}} data-loaded="true"/></span>
      <div class="flex flex-col items-start justify-center"><h4 class="text-sm font-semibold leading-none text-default-600">Zoey Lang</h4><h5 class="text-sm tracking-tight text-default-400">@zoeylang</h5>
      </div>
      </div>
      <button class="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-3 min-w-16 h-8 text-tiny gap-2 rounded-full [&amp;>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover" type="button">Follow</button>
      </div>
      <div class="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-3 py-0"><p class="text-sm pl-px text-default-400">Full-stack developer, @getnextui lover she/her&nbsp;<span aria-label="confetti" role="img">🎉</span></p>
      </div>
      <div class="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large gap-3">
        <div class="flex gap-1"><p class="font-semibold text-default-400 text-sm">4</p><p class=" text-default-400 text-sm">Following</p>
        </div>
        <div class="flex gap-1"><p class="font-semibold text-default-400 text-sm">97.1K</p><p class="text-default-400 text-sm">Followers</p>
        </div>
        </div>
        </div>
    </>
  );
};
