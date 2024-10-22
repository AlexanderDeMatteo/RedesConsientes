import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";


export const Contact = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      let data = {
        name: name,
        email: email,
        message: message
      };
    
      // Validate if all fields are non-empty
      if (data.name.trim() !== "" && data.email.trim() !== "" && data.message.trim() !== "") {
        try {
          actions.sendContactMail(data);
        } catch (error) {
          console.error("Error sending email:", error);
        } finally {
          alert("gracias por su mensaje");
          setSuccessMessage(true);
        }
      } else {
        // Handle the case where one or more fields are empty
        alert("Por favor, complete todos los campos.");
      }
    };

    return(
        <section className="section colored" id="contact-us">
        <div className="container">
            {/* ***** Section Title Start ***** */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="center-heading">
                        <h2 className="section-title">Habla con Nosotros</h2>
                    </div>
                </div>
                <div className="offset-lg-3 col-lg-6">
                    <div className="center-text">
                        <p>"¿Tienes alguna pregunta?, Consejo o Sugerencia ¡Escríbenos! Nuestro equipo estará encantado de ayudarte."</p>
                    </div>
                </div>
            </div>
            {/* ***** Section Title End ***** */}

            <div className="row">
                {/* ***** Contact Text Start ***** */}
                <div className="col-lg-2 col-md-2 col-sm-2">
            
                </div>
                {/* ***** Contact Text End ***** */}

                {/* ***** Contact Form Start ***** */}
                <div className="col-lg-8 col-md-6 col-sm-12">
  <div className="contact-form">
    <form id="contact">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <fieldset>
            <input
              name="name"
              type="text"
              onChange={(event) => setName(event.target.value)}
              className="form-control"
              id="name"
              placeholder="Nombre Completo"
              required
              disabled={successMessage} // Add the disabled attribute here
            />
          </fieldset>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <fieldset>
            <input
              name="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              id="email"
              placeholder="E-Mail"
              required
              disabled={successMessage} // Add the disabled attribute here
            />
          </fieldset>
        </div>
        <div className="col-lg-12">
          <fieldset>
            <textarea
              name="message"
              rows="6"
              onChange={(event) => setMessage(event.target.value)}
              className="form-control"
              id="message"
              placeholder="Tu Mensaje"
              required
              disabled={successMessage} // Add the disabled attribute here
            />
          </fieldset>
        </div>
        <div className="col-lg-12">
          <fieldset>
            <button type="submit" onClick={handleSubmit} id="form-submit" value={"Enviar Correo"} className="main-button">
              Send Message
            </button>
          </fieldset>
        </div>
      </div>
    </form>
  </div>
</div>
                {/* ***** Contact Form End ***** */}
            </div>
        </div>
    </section>
    )
}