import React from "react";
import {Tabs, Tab, Chip} from "@nextui-org/react";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import { InfoTab } from "./tabs profile/InfoTab";
import { ProfileTab } from "./tabs profile/ProfileTab";
import { ProfesionalProfileTab } from "./tabs profile/ProfesionalProfileTab";
import { HomeWork } from "./tabs profile/HomeWork";
import { NetworkTab } from "./tabs profile/NetworkTab";


export const ProfileTabs = () => {
    return (
    <>
      <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-small p-3 border-b border-divider bg-white",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          
        }}
      >
        <Tab
          className=""
          key="informacion"
          title={
            <div className="flex items-center space-x-2">
              <i class="fa-solid fa-brain"></i>
              <span>Informacion</span>
              {/* <Chip size="sm" variant="faded">0</Chip> */}
            </div>
          }
        >
          <Card>
            <CardBody>
              <InfoTab/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab
          key="perfil"
          title={
            <div className="flex items-center space-x-2">
              <i class="fa-regular fa-user"></i>
              <span>Perfil</span>
              {/* <Chip size="sm" variant="faded">0</Chip> */}
            </div>
          }
          >
            <Card>
              <CardBody>
                <ProfileTab/>
              </CardBody>
            </Card>  
          </Tab>
        <Tab
          key="redes"
          title={
            <div className="flex items-center space-x-2">
              <i class="fa-solid fa-globe"></i>
              <span>Redes</span>
              {/* <Chip size="sm" variant="faded">3</Chip> */}
            </div>
          }
          >
            <Card>
              <CardBody>
                <NetworkTab/>
              </CardBody>
            </Card>  
          </Tab>
        <Tab
          key="perfil_profesional"
          title={
            <div className="flex items-center space-x-2">
              <i class="fa-solid fa-user-tie"></i>
              <span>Perfil Profesional</span>
              {/* <Chip size="sm" variant="faded">1</Chip> */}
            </div>
          }
          >
            <Card>
              <CardBody>
               <ProfesionalProfileTab/>
              </CardBody>
            </Card>  
          </Tab>
        <Tab
          key="tareas"
          title={
            <div className="flex items-center space-x-2">
              <i class="fa-solid fa-book"></i>
              <span>Tareas</span>
              {/* <Chip size="sm" variant="faded">1</Chip> */}
            </div>
          }
          >
            <Card>
              <CardBody>
               <HomeWork/>
              </CardBody>
            </Card>  
          </Tab>
      </Tabs>
    </div>  
     
      
    </>
    );
  }
  