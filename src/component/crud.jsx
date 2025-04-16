import React, { useState, useEffect } from 'react';
import './crud.css';


function Crud() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
    });

    const [tasks, setTasks] = useState([]); // State to store fetched tasks

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);

        const sendData = async () => {
            console.log('Form Data Submitted:', formData);
            try {
                const resp = await fetch('https://67e1ca4a58cc6bf78527178d.mockapi.io/crudOps/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    // Send your data in the request body as JSON
                    body: JSON.stringify(formData)
                })
                const data = await resp.json();
                console.log(data);
                getData();

            } catch (error) { console.log(error); }

        }
        sendData();

        setFormData({ name: '', age: '', gender: '' }); // Reset form after submission
    }
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            const res = await fetch('https://67e1ca4a58cc6bf78527178d.mockapi.io/crudOps/users', {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            });
            const fetchedTasks =await res.json();
            setTasks(fetchedTasks)
        } catch (error) { console.log(error); }

    }



    function delData(id) {
        console.log(id);
        fetch(`https://67e1ca4a58cc6bf78527178d.mockapi.io/crudOps/users/${id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            console.log(task);
            getData();
            // Do something with deleted task
        }).catch(error => {
            console.log(error);
            // handle error
        })
    }

    return (
        <>
            <div className='formInput'>
                <h1>CRUD Form</h1>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                            placeholder="Enter your name" />
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter your age"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender" name="gender" value={formData.gender} onChange={handleChange} >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            
            {/* <div>
                <button onClick={getData} id="getBtn" >GET</button>
            </div> */}


            <div>
                <h2>Tasks:</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <strong>Name:</strong> <input type="text" value={task.name} readOnly={true}  /> <strong>Age:</strong> {task.age},{' '}
                            <strong>Gender:</strong> {task.gender}
                            <button id={task.id} onClick={(e) => { delData(e.target.id) }}>Del</button>
                            <button id={task.id} onClick={(e) => { console.log("edit"+e.target.id) }}>Edit</button>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Crud