import React, { Component } from "react";
import {Card, CardHeader, CardBody, Avatar, Image, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import "../../../styles/AboutMe.css"




export const AboutMe = (data) => {
  // const [userData, setUserData] = useState(data.user_data);



  return (
    
      <Card className="bg-white">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start" id="titulo">
        <p  className="text-tiny uppercase font-bold">Sobre mi</p>
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
        {data.user_data.x ?
          <>
            <hr />
            <strong><i class="fa-brands fa-square-x-twitter"></i> X </strong>
            <Link to={`https://www.x.com/${data.user_data.x}`} target="_blank">{data.user_data.x}</Link>

          </> : <>
          </>
        }
        {data.user_data.instagram ?
          <>
            <hr />
            <strong><i style={{ color: "pink" }}  class="fa-brands fa-instagram"></i> Instagram</strong>
            <Link to={`https://www.instagram.com/${data.user_data.instagram}`} target="_blank">{data.user_data.instagram}</Link>

          </> : <>
          </>
        }
        {data.user_data.facebook ?
          <>
            <hr />
            <strong><i style={{ color: "blue" }}  class="fa-brands fa-square-facebook"></i> Facebook</strong>
            <Link to={`https://www.facebook.com/${data.user_data.facebook.replaceAll(" ",".")}`} target="_blank">{data.user_data.facebook}</Link>

          </> : <>
          </>
        }
        {data.user_data.tiktok ?
          <>
            <hr />
            <strong><i style={{ color: "white", background: "black" }}  class="fa-brands fa-tiktok"></i> Tiktok</strong>
            <Link to={`https://www.tiktok.com/@${data.user_data.tiktok.replaceAll(" ",".")}`} target="_blank">{data.user_data.tiktok}</Link>

          </> : <>
          </>
        }
        {data.user_data.linkedin ?
          <>
            <hr />
            <strong><i style={{ color: "blue" }} class="fa-brands fa-linkedin"></i> Linkedin</strong>
            <Link to={`https://www.linkedin.com/in/${data.user_data.linkedin.replaceAll(" ","-")}`} target="_blank">{data.user_data.linkedin}</Link>

          </> : <>
          </>
        }
      </CardBody>
    </Card>

  )
};