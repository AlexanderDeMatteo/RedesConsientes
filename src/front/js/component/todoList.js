import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const TodoList = () => {
  const { id } = useParams();
  const { actions, store } = useContext(Context);
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [checked, setChecked] = useState(false); // Estado del checkbox

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const saveTask = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await actions.post_patient_task(id, task);
        if (response.ok) {
          await actions.get_patient_task(id);
          setIsLoading(false);
          setTaskList(store.patientTask);
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

  useEffect(() => {
    // Actualizar taskList cuando la lista de tareas en el store cambie
    if (!isLoading) {
      setTaskList(store.patientTask);
    }
  }, [store.patientTask, isLoading]);

  return (
    <div>
    
      <input
        placeholder="Introduce la tarea"
        name="description"
        value={task.description}
        onChange={handleChange}
        onKeyDown={saveTask}
        type="text"
        class="form-control" 
        aria-label="Sizing example input" 
        aria-describedby="inputGroup-sizing-sm"
      />
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          {taskList.length > 0 ? (
            <>
              <ul className="lista">
                {taskList.map((item, index) => (
                    
                  <li key={index} className="p-2 g-col-6">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={checked}
                      onChange={handleCheck}
                    />
                    <label className="form-check-label">
                    {`${index + 1}- ${item.description} `}
                    </label>
                    <a onClick={() => deleteTask(item.id)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </a>
                  </li>
                ))}
              </ul>
              <div>Tienes {taskList.length} tareas pendientes</div>
              <div class="input-group mb-3">
  <div class="input-group-text">
    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"/>
  </div>
  <input type="text" class="form-control" aria-label="Text input with checkbox"/>
</div>
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
