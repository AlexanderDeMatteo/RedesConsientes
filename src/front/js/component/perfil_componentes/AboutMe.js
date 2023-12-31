import React, { Component } from "react";




export const AboutMe = (data) => {
  // const [userData, setUserData] = useState(data.user_data);
  console.log(data.user_data)


  return (
    <div class="card card-primary ">
      <div class="card-header">
        <p class="card-title">Sobre mi</p>
      </div>

      <div class="card-body">
        {data.user_data.education ? <>
          <strong><i class="fas fa-book mr-1"></i> Educacion</strong>
          <p class="text-muted">
            {data.user_data.education}
          </p>
        </> : ""}
        <hr />
        <strong><i class="fas fa-map-marker-alt mr-1"></i> Locacion</strong>
        <p class="text-muted">{data.user_data.state}, {data.user_data.city}</p>
        {data.user_data.twitter ?
          <>
            <hr />
            <strong><i className="fab fa-twitter fa-lg"></i> Twitter</strong>
            <p class="text-muted">{data.user_data.twitter}</p>

          </> : <>
          </>
        }
        {data.user_data.instagram ?
          <>
            <hr />
            <strong><i className="fab fa-instagram fa-lg"></i> Instagram</strong>
            <p class="text-muted">{data.user_data.instagram}</p>

          </> : <>
          </>
        }
        {data.user_data.facebook ?
          <>
            <hr />
            <strong><i className="fab fa-facebook fa-lg"></i> Facebook</strong>
            <p class="text-muted">{data.user_data.facebook}</p>

          </> : <>
          </>
        }

      </div>



    </div>
  )
};