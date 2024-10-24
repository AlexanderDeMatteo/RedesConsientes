import React, { useState, useContext, useEffect } from "react";
import {Button, Input, Card, CardBody, Checkbox} from "@nextui-org/react";
import { Context } from "../../../store/appContext";
import { useParams } from "react-router-dom";
// import "../../../../styles/jumbotron.css"

export const HomeWork = () => {
  const { id } = useParams();
  const { actions, store } = useContext(Context);
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [isSelected, setIsSelected] = useState(false);
  const [tareasCumplidas, setTareasCumplidas] = useState([])
  

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const tareasCompletadas  = () => {
    const completedItems = [];

    for (const item of taskList) {
      if (item.completed) {
      completedItems.push(item);
    }
    }
    return completedItems.length

  }
 

  const buttonSaveTask = async () => {
    try {
      const response = await actions.post_patient_task(id, task);
      await actions.get_patient_task(id);
      setIsLoading(false);
      setTaskList(store.patientTask);
      if (response.ok) {
      } else {
        console.log("Error al guardar la tarea:", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con la API:", error);
    }
  }

  const saveTask = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await actions.post_patient_task(id, task);
        await actions.get_patient_task(id);
        setIsLoading(false);
        setTaskList(store.patientTask);
        if (response.ok) {
        } else {
          console.log("Error al guardar la tarea:", response.statusText);
        }
      } catch (error) {
        console.error("Error al comunicarse con la API:", error);
      }
    }
  };

  const addTask = (newTask) => {
    setTaskList([...taskList, newTask]);
  };

  const deleteTask = (taskId) => {
    actions.delete_patient_task(taskId);
    setTaskList(taskList.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    // Maneja la carga de datos y actualiza el estado de carga
    actions.handle_patient_data_seleccinado(id);
    actions.get_patient_task(id).then(() => {
      setIsLoading(false);
      setTaskList(store.patientTask);
      tareasCompletadas()

    });
  }, []);
  
 
  useEffect(() => {
    // Actualizar taskList cuando la lista de tareas en el store cambie
    if (!isLoading) {
      setTaskList(store.patientTask);
    }
  }, [store.patientTask, isLoading]);

  return (
    <div>
      {store.userData.role_id == 2 ? 
      <div className="d-flex align-items-end mb-2 ">
      <Input
          type="text"
          onChange={handleChange}
          value={task.description}
          onKeyUp={saveTask}
          name="description"
          label="Lista de Tareas"
          placeholder="Introduce una tarea"
          labelPlacement="outside"
          required minlength="4" maxlength="110"
          startContent={
            <i className="fa-solid fa-list-check"></i>
          }
          />
        <Button id="button"
        type="button" onClick={() => buttonSaveTask()}
        >
      Añadir tarea <i className="fa-solid fa-pencil"></i>
        </Button>
      </div>
        :""}
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          {taskList.length > 0 ? (
            <>
            <Card>
            <CardBody>
              <ul className="lista">
                {taskList.map((item, index) => (
                <>
                 
                
                <li key={index} className="p-0">
<Input
          type="text"
          placeholder={`${index + 1}- ${item.description} `}
          labelPlacement="outside"
          endContent={<i className="fa-regular fa-trash-can" onClick={() => deleteTask(item.id)} style={{cursor: "pointer"}}></i>
          }
          startContent={<Checkbox color="primary" isSelected={item.completed} ></Checkbox>  }
        />
</li>
<br></br>
                </>
                ))}
              </ul>
              <div>Tienes {taskList.length - tareasCompletadas()} tareas pendientes</div>
              </CardBody>
              </Card>
            </>
          ) : (
            <div>No hay tareas disponibles</div>
            
          )}
        </>
      )}
    </div>
  );
};


<div className="input-group mb-3">
  <div className="input-group-text">
    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/>
  </div>
  <input type="text" className="form-control" aria-label="Text input with checkbox"/>
</div>
