// 1. Import
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


//2 y 5. Crear componente y exportarlo
export const ToDo = () => {
    //3. Código JS
    //3.1 Definir Hooks
    const [inputValue, setInputValue] = useState('');
    const [listTask, setListTask] = useState([]);
    const [isActive, setIsActive] = useState(false);
    // isActive useState

    const base_url = "https://playground.4geeks.com/apis/fake";
    const user_name = "ElisaGDR1";

    //3.2 Difinir funciones handle

    function handleInput(event) {
        setInputValue(event.target.value);
    }
    // Necesito un array con los nombres de las tareas
    function addTask(event) {
        event.preventDefault();
        setListTask([...listTask, { label: inputValue, done: false }]);
        // console.log(listTask);
        setIsActive(true);
        setInputValue('');
    };
    function deleteTask(index) {
        setListTask(listTask.filter((item, id) => id !== index));
    };
    useEffect(() => {
        getTodo();
    }, [])


    // NUEVO TODO LIST

    // 1. define la funcion asincrona que ejecutara el request -- GET
    const getTodo = async () => {
        // 2. defino la variable con un endpoint (url de la API)
        let url = base_url + '/todos/user/' + user_name;
        // 3. Defino el request option
        let options = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        // 4. ejecuto el fetch en modo espera (Await) y se lo asigno a la variable response
        const response = await fetch(url, options);
        // 5. verifico si la respuesta da ok o error
        if (response.ok) {
            // 5.1. Si la respuesta es "OK" ejecuto el método json() en modo await y 
            //     su resultado lo guardo en la variable data
            const data = await response.json();
            // 5.2 Actualizo el estado listTask con los datos obtenidos
            console.log("OK", data);
            setListTask(data);
            //setIsActive(true);

            // 6. Manejo el error si la respuesta no es exitosa
        } else {
            console.log("ERROR:", response.status, response.statusText);
        }
    }

    // 1. define la funcion asincrona que ejecutara el request -- POST (Crear usuario)
    const postTodo = async () => {
        // 2. Defino la url de la API y options
        let url = base_url + '/todos/user/' + user_name;
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([]),
        }
        // 4. Realizo solicitud POST
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Quiero mostar los todos
            getTodo();
            // Quiero cambiar el valor de isActive
            setIsActive(true)
        } else {
            console.log("ERROR:", response.status, response.statusText);
        }
    }

    // 1. define la funcion asincrona que ejecutara el request -- PUT
    const putTodo = async (updateList) => {
        // 2. defino la URL de la API
        let url = base_url + '/todos/user/' + user_name;
        // 3. Defino el request option
        let options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateList)
        };
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setIsActive(true);
        } else {
            console.log("ERROR:", response.status, response.statusText);
        }
    }

    // 1. define la funcion asincrona que ejecutara el request -- DELETE
    const deleteTodo = async () => {
        // 2. defino la URL de la API
        let url = base_url + '/todos/user/' + user_name;
        // 3. Defino el request option
        let options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            setInputValue("");
            setListTask([]);
            setIsActive(false);
        } else {
            console.log("ERROR:", response.status, response.statusText);
        }

    }

    // 4. Elemento html (input, ul, contador)
    return (
        <div className="main col-xs-10 col-md-8 col-lg-6">
            <h1>ToDos</h1>
            <div className="container">
                <ul>
                    {/* Generar dinámicamente  todas las tareas tomado como base el array tasks*/}
                    <li>
                        <form onSubmit={addTask}>
                            <input type="text" onChange={handleInput} value={inputValue}
                                placeholder="What else do you need to do?" />
                        </form>
                    </li>
                    {listTask.map((task, index) => (
                        <li key={index} className="taskItem hidden-icon">{task.label}
                           {/*<FontAwesomeIcon icon={faX} className="icon" onClick={() => deleteTask(index)} />*/}
                        </li>
                    ))}
                    <li>{listTask.length === 0 ? "You don't have tasks to do." : listTask.length + " tasks left to do."}</li>
                </ul>
            </div>
            <button className="btn bg-dark text-light" type="button" onClick={isActive ? deleteTodo : postTodo }>{isActive ? "Delete tasks" : "Write tasks"}</button>
        </div>
    );
};
