import React, { Component } from "react";
import {Card, CardHeader, CardBody, Avatar, Image, Button} from "@nextui-org/react";




export const AboutMe = (data) => {
  // const [userData, setUserData] = useState(data.user_data);



  return (
    
      <Card className="bg-white">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start bg-primary">
        <p className="text-tiny uppercase font-bold">Sobre mi</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
      {data.user_data.education ? <>
          <strong><i className="fas fa-book mr-1"></i> Educacion</strong>
          <p className="text-muted">
            {data.user_data.education}
          </p>
        </> : ""}
      {data.user_data.state || data.user_data.city ?
      <>
        <hr />
        <strong><i className="fas fa-map-marker-alt mr-1"></i> Locacion</strong>
        <p className="text-muted">{data.user_data.state}, {data.user_data.city}</p>
      </>
        : ""}
        {data.user_data.twitter ?
          <>
            <hr />
            <strong><i classNameName="fab fa-twitter fa-lg"></i> Twitter</strong>
            <p className="text-muted"> <i class="fa-brands fa-twitter"></i>{data.user_data.twitter}</p>

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
      </CardBody>
    </Card>

  )
};