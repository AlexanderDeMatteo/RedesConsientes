import React, { useState, useContext, useEffect } from "react";
import "../../../styles/imagenes.css";
import "../../../styles/jumbotron.css"
import { Context } from "../../store/appContext";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export const Imagenes2 = () => {
  const { actions } = useContext(Context);
  const [media, setMedia] = useState("");
  const [urlMedia, setUrlMedia] = useState("");
  useEffect(() => {
    if (media != "") uploadFile();
  }, [media]);

  async function uploadFile() {
    let YOUR_CLOUD_NAME = "alexander0201";
    let YOUR_UNSIGNED_UPLOAD_PRESET = "zkvkmknt";

    let POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    let formData = new FormData();
    formData.append("file", media);
    formData.append("cloud_name", YOUR_CLOUD_NAME);
    formData.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);

    try {
      const response = await fetch(POST_URL, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const body = await response.json();
        //funcion al flux
        setUrlMedia(body.url);
      }
    } catch (error) {
      document.querySelector(
        `#${id} .status-text`
      ).innerHTML = `<span className="failure">el archivo no pudo subirse...`;
    }
  }
  const handlePicture = () => {
    actions.picture_profile(urlMedia);
  };

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

  
  return (
    <>
      <div className="flex flex-wrap gap-3 justify-content-center p-2">
        {backdrops.map((b) => (
            <Button  
            key={b}
            variant="flat" 
            id="button"
            onPress={() => handleOpen(b)}
            className="capitalize"

            >
           imagen de perfil<i class="fa-solid fa-camera"></i>
          </Button>
        
        ))}  
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
              <>
              <ModalHeader className="flex flex-col gap-1 titulo">Selecciona tu imagen de perfil</ModalHeader>
              <ModalBody>
                <p className="subtitulo2"> 
                  Se recomienda que selecciones una imagen pulcra y profecional
                </p>
                <label htmlFor="img" className="agregarFoto subtitulo2">
                Seleccionar Imagen
                </label>
              <input
                type="file"
                id="img"
                style={{ display: "none" }}
                onChange={(e) => setMedia(e.target.files[0])}
              />
              <div id="preview">
              {urlMedia && <img width={50} height={50} src={urlMedia} />}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button id="button" className="subtitulo2" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button id="button" className="subtitulo2" variant="shadow" onPress={handlePicture}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
          </>
        );
    
  
};