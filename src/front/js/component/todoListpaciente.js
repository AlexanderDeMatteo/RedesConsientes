import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const TodoListPaciente = () => {
  const { actions, store } = useContext(Context);
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [checked, setChecked] = useState(true); // Estado del checkbox
  const [id, setId] = useState([])
  
console.log(id)
  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleTaskCompletion = async (taskId) => {
    // Actualizar el estado local de la tarea
    setTaskList(taskList.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
    
    // Enviar la solicitud a la API para actualizar el estado en el servidor
    // ...
  };
  
  const hola = (taskId, completed) =>{
    actions.complete_patient_task(taskId, completed)
    console.log("hola")
  }

  const addTask = (newTask) => {
    setTaskList([...taskList, newTask]);
  };

  const deleteTask = (taskId) => {
    actions.delete_patient_task(taskId);
    setTaskList(taskList.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    // Maneja la carga de datos y actualiza el estado de carga
    actions.handle_patient_own_task().then(() => {
      setIsLoading(false);
      setTaskList(store.patientTask);
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
    
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          {taskList.length > 0 ? (
            <>
              <ul className="lista">
                {taskList.map((item, index) => (
                  <div class="input-group-text">
                  <li key={index} className="p-0">

                    {console.log(item.completed)}
                  <label className="form-check-label  w-100"style={{paddingLeft:20}} for="task">
                      
                  <input class="form-check-input mt-1" type="checkbox" onClick={hola(item.id, item.completed)} onChange={() => handleTaskCompletion(item.id)} checked={item.completed} style={{cursor: "pointer"}}  aria-label="Checkbox for following text input" />
                    {`${index + 1}- ${item.description} ${item.id} `}
                    {store.userData.is_psicologo ? <i className="fa-regular fa-trash-can" onClick={() => deleteTask(item.id)} style={{cursor: "pointer"}}></i> : " " }
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


<div class="input-group mb-3">
  <div class="input-group-text">
    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/>
  </div>
  <input type="text" class="form-control" aria-label="Text input with checkbox"/>
</div>
