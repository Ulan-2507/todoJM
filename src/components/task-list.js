import React from 'react';
import Task from './task.js';

const TaskList = ({ todos, onCompleted, onUpdateLabel, onEditing, onDeleted }) => {
    const elements = todos.map((item) => {
        const {id, className, hidden, ...itemPorops} = item;
        return (
            <li key={ id } className={ className } hidden={ hidden }>
                <Task {...itemPorops}
                      onCompleted={() => onCompleted(id)}
                      onUpdateLabel={(label) => onUpdateLabel(id, label)}
                      onEditing={() => onEditing(id)}
                      onDeleted={() => onDeleted(id)}
                    />
            </li>
        )
    });
    
    return (
        <ul className='todo-list'>
            { elements }
        </ul>
    )
};

export default TaskList;