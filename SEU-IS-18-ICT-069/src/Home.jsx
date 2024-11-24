import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]); 
    };

    // Delete a Data
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    // Update a Data
    const handleUpdate = (id) => {
        const updatedTask = prompt('Enter the new task:');
        if (updatedTask) {
            axios.put(`http://localhost:8080/update/${id}`, { tast: updatedTask })
                .then((response) => {
                    setTodos(todos.map(todo => todo._id === id ? { ...todo, tast: response.data.tast } : todo));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <h2>Student Information</h2>
            <Create onAdd={addTodo} /> {/* Pass addTodo as onAdd to Create */}
            {todos.length === 0 ? (
                <div>
                    <p>No Data</p>
                </div>
            ) : (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="tbodydesign">
                        {todos.map((todo, index) => (
                            <tr key={index}>
                                <td>{todo.tast}</td>
                                <td className='two_button'>
                                    <button class="update" onClick={() => handleUpdate(todo._id)}>Update</button>
                                    <button class="delete" onClick={() => handleDelete(todo._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Home;
