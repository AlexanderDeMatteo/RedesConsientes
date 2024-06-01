import React, { Component } from "react";




export const AboutMe = (data) => {
  // const [userData, setUserData] = useState(data.user_data);



  return (
    <div className="card card-primary ">
      <div className="card-header">
        <p className="card-title">Sobre mi</p>
      </div>

      <div className="card-body">
        {data.user_data.education ? <>
          <strong><i className="fas fa-book mr-1"></i> Educacion</strong>
          <p className="text-muted">
            {data.user_data.education}
          </p>
        </> : ""}
        <hr />
        <strong><i className="fas fa-map-marker-alt mr-1"></i> Locacion</strong>
        <p className="text-muted">{data.user_data.state}, {data.user_data.city}</p>
        {data.user_data.twitter ?
          <>
            <hr />
            <strong><i classNameName="fab fa-twitter fa-lg"></i> Twitter</strong>
            <p className="text-muted">{data.user_data.twitter}</p>

          </> : <>
          </>
        }
        {data.user_data.instagram ?
          <>
            <hr />
            <strong><i classNameName="fab fa-instagram fa-lg"></i> Instagram</strong>
            <p className="text-muted">{data.user_data.instagram}</p>

          </> : <>
          </>
        }
        {data.user_data.facebook ?
          <>
            <hr />
            <strong><i classNameName="fab fa-facebook fa-lg"></i> Facebook</strong>
            <p className="text-muted">{data.user_data.facebook}</p>

          </> : <>
          </>
        }

      </div>



    </div>
  )
};