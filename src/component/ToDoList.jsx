import React from 'react'
import { useState, useEffect } from 'react'

function ToDoList() {

    const apiUrl = "https://67e1ca4a58cc6bf78527178d.mockapi.io/crudOps/tasks";
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        name: "",
        completed: false,
        id: null

    })

    function addTask() {
        
        // console.log('Form Data is being Submitted:', task);
        if (task.name.trim() === "") {
            console.log("The string is empty");
        } else {        
        const sendData = async () => {

            try {
                const resp = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    // Send your data in the request body as JSON
                    body: JSON.stringify(task)
                })
                const data = await resp.json();
                // console.log("data", data);
                getData();

            } catch (error) { console.log(error); }

        }
        sendData();
        setTask({ name: '', completed: '', id: '' });
    }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setTask((prevData) => ({
            ...prevData,
            [name]: value,
            id: prevData.id + 1

        }));

       
    }

    async function getData() {
        try {
            const res = await fetch(apiUrl, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            });
            const fetchedTasks = await res.json();
            // console.log("fetchedTasks", fetchedTasks);
            setTasks(fetchedTasks)
            // console.log("Tasks", tasks);
        } catch (error) { console.log(error); }

    }

    function deleteTask(id,name) {
        // console.log("del", id);

       
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // console.log("after del", task);
            getData();
            // Do something with deleted task
        }).catch(error => {
            console.log(error);
            // handle error
        })
    }

    useEffect(() => {

        getData();
    }, [])

    function taskStatus(e, id) {
        const isChecked = e.target.checked; // Check if the checkbox is checked
        // console.log(`${id} Checkbox is ${isChecked ? "checked" : "unchecked"}`);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: isChecked } : task
            )
        );

        fetch(`${apiUrl}/${id}`, {
            method: 'PUT', // or PATCH
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ completed: isChecked })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // console.log(task)
        }).catch(error => {
            // handle error
            console.log(error)
        })

    }

    return (
        <div className="to-do-list">

            <h1>To-Do-List</h1>

            <div>

                <input type="text" id="name" name="name" placeholder="Enter a task..." value={task.name} onChange={handleInputChange} />

                <button className="add-button" onClick={addTask}>
                    Add
                </button>
                {/* <button onClick={getData}>🗘</button> */}
            </div>




            {/* <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>Name:</strong> <input type="text" value={task.name} readOnly={true} /> <strong>Age:</strong> {task.age},{' '}
                        <strong>Gender:</strong> {task.gender}
                        <button id={task.id} onClick={(e) => { deleteTask(e.target.id) }}>Del</button>
                        <button id={task.id} onClick={(e) => { console.log("edit" + e.target.id) }}>Edit</button>

                    </li>
                ))}
            </ul> */}

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}  style={{
                        backgroundColor: task.completed ?"#000000b1":"rgb(5, 5, 5)"}}>
                        <input type='checkbox' checked={task.completed} className='checkbox' onChange={(e) => taskStatus(e, task.id)} />
                        <span className="text" style={{

                            textDecoration: task.completed ? "line-through" : "none",
                            textDecorationThickness: task.completed ? "2px" : "initial",
                            
                                                 
                        }}>{task.name}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(task.id,task.name)}>
                            Delete
                        </button>

                        {/* <button
                            className="add-button"
                            onClick={() => console.log(task.id)}>✔
                        </button> */}
                        {/* <button
                        className="move-button"
                        onClick={() => moveTaskUp(index)}>
                        🢁
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskDown(index)}>
                        🡻
                    </button>  */}
                    </li>
                )}
            </ol>

        </div>);
}
export default ToDoList