import React, { Component } from "react";

import NewTaskForm from "./new-task-form.js";
import TaskList from "./task-list.js";
import Footer from "./footer.js";

export default class App extends Component {
  maxId = 0;
  state = {
    todoData: [
      this.createTodoItem("completed", "Completed task"),
      this.createTodoItem("editing", "Editing task"),
      this.createTodoItem(null, "Active task"),
    ],
  };

  createTodoItem(className, label) {
    return {
      className,
      label,
      hidden: false,
      id: this.maxId++,
      createdDate: new Date(),
    };
  }
  update = (todoData, id, className, label) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    let newItem;
    if (className) {
      newItem = {
        ...oldItem,
        className: oldItem.className === className ? null : className,
      };
    }
    if (label) {
      newItem = { ...oldItem, label };
    }
    return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
  };
  updateLabel = (id, label) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.update(todoData, id, null, label),
      };
    });
  };
  completed = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.update(todoData, id, "completed", null),
      };
    });
  };
  editing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.update(todoData, id, "editing", null),
      };
    });
  };
  addTodoItem = (label) => {
    const newItem = this.createTodoItem(null, label);
    this.setState(({ todoData }) => {
      const newData = [...todoData, newItem];

      return {
        todoData: newData,
      };
    });
  };

  deleteTodoItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };
  show = (className) => {
    this.showAll();
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.className !== className) {
          item.hidden = true;
        }
        return item;
      });
      return newArray;
    });
  };
  showCompleted = () => {
    this.show("completed");
  };
  showActive = () => {
    this.show(null);
  };
  showAll = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        item.hidden = false;
        return item;
      });
      return {
        todoData: newArray,
      };
    });
  };
  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter(
        (item) => item.className !== "completed"
      );
      return {
        todoData: newArray,
      };
    });
  };
  render() {
    const { todoData } = this.state;
    const todoCount = todoData.filter((item) => !item.className).length;
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTodoItem={this.addTodoItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onCompleted={this.completed}
            onUpdateLabel={this.updateLabel}
            onEditing={this.editing}
            onDeleted={this.deleteTodoItem}
          />
          <Footer
            toDo={todoCount}
            onShowAll={this.showAll}
            onShowActive={this.showActive}
            onShowCompleted={this.showCompleted}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </>
    );
  }
}
