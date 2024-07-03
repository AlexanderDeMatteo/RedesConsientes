import React from "react";
import {Tabs, Tab, Chip} from "@nextui-org/react";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import { InfoTab } from "./tabs profile/InfoTab";


export const ProfileTabs = () => {
    return (
    <>
      <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-small p-0 border-b border-divider bg-white",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          className="pl-3"
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>  
          </Tab>
        <Tab
          key="perfil_paciente"
          title={
            <div className="flex items-center space-x-2">
              <i class="fa-solid fa-user"></i>
              <span>Perfil Paciente</span>
              {/* <Chip size="sm" variant="faded">1</Chip> */}
            </div>
          }
          >
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>  
          </Tab>
        <Tab
          key="tareas"
          title={
            <div className="flex items-center space-x-2">
              <i class="fa-solid fa-list-check"></i>
              <span>Tareas</span>
              {/* <Chip size="sm" variant="faded">1</Chip> */}
            </div>
          }
          >
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>  
          </Tab>
      </Tabs>
    </div>  
     
      
    </>
    );
  }
  