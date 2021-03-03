import React, { Component } from 'react';

import TaskList from '../task-list';
import Footer from '../footer';

export default class AppMain extends Component {
    maxId = 100;
    state = {
        todoData: [
            {label: "Completed task", className: "completed", id: 1 },
            {label: "Editing task", className: "editing", id: 2 },
            {label: "Active task", className: null, id: 3 },
        ],
    }

    completed = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const updataTodo = todoData.slice(idx, idx+1);
            updataTodo[0].className = todoData[idx].className === "completed" ? null : "completed";
            const newArray = [
                ...todoData.slice(0, idx),
                ...updataTodo,
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArray
              };
        });
    }
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
          const idx = todoData.findIndex((el) => el.id === id);
          const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
          ];
          return {
            todoData: newArray
          };
        })
    }

    render() {
        return (
            <section className="main">
                <TaskList todos={ this.state.todoData }
                          onCompleted={ this.completed }
                          onDeleted={ this.deleteItem }/>
                <Footer />
            </section>
        );
    }
    
};

