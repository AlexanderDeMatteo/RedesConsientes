import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button,} from "@nextui-org/react";
import {Badge} from "@nextui-org/react";


export const Notification = () => {
  
  const { actions, store } = useContext(Context);
  
  const [notifications, setNotifications] = useState([])

  
  return (

    <Badge content={notifications.length} shape="circle" color="warning">
      <Dropdown >
        <DropdownTrigger>
          <Button
            radius="full"
            isIconOnly
            aria-label="more than 99 notifications"
            variant="light"
            isInvisible="true"
          >
            <i class="fa-regular fa-bell" style={{"font-size":20, color:"grey"}}></i>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Notifications">
          {/* Map over notifications array and render each notification */}
          {notifications.map((notification) => (
            <DropdownItem key={notification.id} css={{ padding: "1rem" }}>
              {/* Render notification content based on your notification structure */}
              <div>
                {/* Example: Show notification title and message */}
                <b>{notification.title}</b>
                <p>{notification.message}</p>
              </div>
            </DropdownItem>
          ))}
          {/* You can add an empty message if there are no notifications */}
          {notifications.length === 0 && (
            <DropdownItem disabled>No notifications</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown> 
    </Badge>
    
    );
  }
  