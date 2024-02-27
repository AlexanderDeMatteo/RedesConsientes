import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import psicologo_img from "../component/perfil_componentes/psicologo.png";

export const Expedientes = () => {
  const { actions, store } = useContext(Context);

  const [patients, setPatients] = useState([]);
  console.log(patients)
  useEffect(() => {
    actions.handle_patient_data((data) => setPatients(data));
  }, []);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value.toLowerCase() });
  };

  useEffect(() => {
    setPatients(store.userPatients);
  }, [store.userPatients]);

  return (
    <>
      <div className="content-wrapper">
        <div>Expedientes</div>
        {patients.length === 0 && <div>no hay Expedientes disponibles</div>}
        {patients.length > 0 && (
          <>
          <div className="row">
                {patients.map((patient, index) => (
                <div className="col-md-3">
                <div className="card card-primary card-outline">
                    <div>
                    <div className="text-center">
                        <img
                        src={
                            psicologo_img
                        }
                        alt="User profile picture"
                        id="avatar_perfil"
                        className="profile-user-img img-fluid img-circle"
                        />
                    </div>
                    <h5 className="my-3 text-center">
                        {patient.name} {patient.last_name} {patient.id}
                    </h5>

                    <a href={`/Expedientes/${patient.id}`} className="btn btn-primary btn-block">
                        <b>perfil paciente</b>
                    </a>
                    </div>
                </div>

                </div>
                ))}
          </div>
          </>
        )}
      </div>
    </>
  );
};
