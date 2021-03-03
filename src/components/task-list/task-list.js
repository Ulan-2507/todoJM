import React from 'react';
import Task from '../task';


const TaskList = ({ todos, onDeleted, onCompleted }) => {
    const elements = todos.map((item) => {
        const { id, className, ...itemProps } = item;
        return (
            <li key={id} className={className}>
                <Task {...itemProps} 
                onCompleted={() => onCompleted(id) }
                onDeleted={() => onDeleted(id)}/>  
            </li>     
        );
    });
   
    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
};

export default TaskList;