// 1. Import
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons"; 

//2 y 5. Crear componente y exportarlo
export const ToDo = () => {
    //3. Código JS
    //3.1 Definir Hooks
    const [inputValue, setInputValue] = useState('');
    const [listTask, setListTask] = useState([]);

    //3.2 Difinir funciones handle

    function handleInput(event) {
        setInputValue(event.target.value);
    }
    // Necesito un array con los nombres de las tareas
    function addTask(event) {
        event.preventDefault();
        setListTask([...listTask, inputValue]);
        console.log(listTask);
        setInputValue('');
    };
    function deleteTask(index){
        setListTask(listTask.filter((item, id) => id !== index) );
    };

    // 4. Elemento html (input, ul, contador)
    return (
        <div className="main">
            <h1>ToDos</h1>
            <div className="container">
                <ul id="lista">
                    {/* Generar dinámicamente  todas las tareas tomado como base el array tasks*/}
                    <li>
                        <form onSubmit={addTask}>
                            <input type="text" onChange={handleInput} value={inputValue}
                                placeholder="What else do you need to do?" />
                        </form>
                    </li>
                    {listTask.map((task, index) => (
                        <li key={index} className="taskItem hidden-icon">{task}
                        <FontAwesomeIcon icon={faX} className="icon" onClick={() => deleteTask(index)}/>
                        </li>
                    ))}
                    <li>{listTask === 0 ? "You don't have tasks to do." : `${listTask.length} tasks left to do.`}</li>
                </ul>
            </div>
        </div>
    );
};