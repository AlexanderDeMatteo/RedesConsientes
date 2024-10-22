import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export const ClientCard = (data) =>{

    function to12HourFormat(time24h) {
        if (typeof time24h === 'undefined') {
            time24h = ""; // Establece un valor por defecto como una cadena vacía
          }
        // Divide la cadena de tiempo en horas y minutos
        const [hours, minutes] = time24h.split(":");
      
        // Convierte las horas a un número entero
        const hourInt = parseInt(hours);
      
        // Determina el indicador AM/PM
        const amPm = hourInt >= 12 ? "PM" : "AM";
      
        // Ajusta las horas para el formato de 12 horas
        let hour12 = hourInt % 12;
      
        // Maneja el caso especial de las 12 en punto
        hour12 = hour12 === 0 ? 12 : hour12;
      
        // Formatea la hora con padding de ceros y agrega los minutos y AM/PM
        return `${hour12.toString().padStart(2, "0")}:${minutes} ${amPm}`;
      }
    return(
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3 " id="card">
                <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
                />
                <div className="flex flex-col">
                <p className="text-md">Psicologo</p>
                <p className="text-md ">{data.item.psychologist_name} {data.item.psychologist_last_name}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>Hora: {to12HourFormat(data.item.start_time)} - {to12HourFormat(data.item.end_time)}</p>
            </CardBody>
            <Divider/>
            <CardFooter>
                <Link
                isExternal
                showAnchorIcon
                className="link"
                href={`/session/${data.id}/${data.item.room_number}`}
                >
                ir a session
                </Link>
            </CardFooter>
        </Card>
    )
}