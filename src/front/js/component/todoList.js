import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const TodoList = () => {
  const { id } = useParams();
  const { actions, store } = useContext(Context);
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [checked, setChecked] = useState(true); // Estado del checkbox

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

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
    });
  }, []);
  
  console.log(store.patientTask.completed)
  console.log(store.patientTask)
  useEffect(() => {
    // Actualizar taskList cuando la lista de tareas en el store cambie
    if (!isLoading) {
      setTaskList(store.patientTask);
    }
  }, [store.patientTask, isLoading]);

  return (
    <div>
      <div className="d-flex">
        <input
          placeholder="Introduce la tarea"
          name="description"
          value={task.description}
          onChange={handleChange}
          onKeyUp={saveTask}
          type="text"
          className="form-control" 
          aria-label="Sizing example input" 
          aria-describedby="inputGroup-sizing-sm"
          required minlength="4" maxlength="110"
        />
        <button type="button" onClick={() => buttonSaveTask()}  class="btn btn-primary">Añadir Tarea</button>
      </div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          {taskList.length > 0 ? (
            <>
              <ul className="lista">
                {taskList.map((item, index) => (
                  <div className="input-group-text">
                  <li key={index} className="p-0">

                    {console.log(item.completed)}
                  <label className="form-check-label  w-100"style={{paddingLeft:20}} for="task">
                      
                  <input className="form-check-input mt-1" type="checkbox" checked={item.completed} style={{cursor: "pointer"}}  aria-label="Checkbox for following text input" />
                    {`${index + 1}- ${item.description} `}
                    <i className="fa-regular fa-trash-can" onClick={() => deleteTask(item.id)} style={{cursor: "pointer"}}></i>
                    </label>
                  </li>
                </div>  
                ))}
              </ul>
              <div>Tienes {taskList.length} tareas pendientes</div>

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
