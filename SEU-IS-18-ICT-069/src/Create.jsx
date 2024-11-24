
import React, { useState } from 'react';
import axios from 'axios';

function Create({ onAdd }) {
    const [tast, setTask] = useState('');

    const handleAdd = () => {
        if (!tast.trim()) { 
            alert('Please fill in the task before adding.');
            return;  
        }

        axios.post('http://localhost:8080/add', { tast: tast })
            .then(result => {
                onAdd(result.data);  
                setTask('');  
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter your name"
                value={tast} 
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
