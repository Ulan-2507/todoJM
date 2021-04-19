import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

export default class App extends Component {
  status = {
    COMPLETED: "completed",
    EDITING: "editing",
  };
  state = {
    todoData: [],
  };

  componentDidMount() {
    if (localStorage.getItem("data")) {
      this.setState({ todoData: JSON.parse(localStorage.getItem("data")) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("data", JSON.stringify([...this.state.todoData]));
  }

  createTodoItem(className, label) {
    return {
      className,
      label,
      show: true,
      id: uuidv4(),
      createdDate: new Date().toString(),
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
        todoData: this.update(todoData, id, this.status.COMPLETED, null),
      };
    });
  };

  editing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.update(todoData, id, this.status.EDITING, null),
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
      const newArray = todoData.filter((item) => item.id !== id);
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
          item.show = false;
        }
        return item;
      });
      return newArray;
    });
  };
  showCompleted = () => {
    this.show(this.status.COMPLETED);
  };
  showActive = () => {
    this.show(null);
  };
  showAll = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        item.show = true;
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
        (item) => item.className !== this.status.COMPLETED
      );
      return {
        todoData: newArray,
      };
    });
  };
  render() {
    const { todoData } = this.state;
    const todoCount = todoData.filter((item) => !item.className).length;
    let isTask = todoData.length > 0 ? true : false;
    const noTasks = !isTask && <p>there's no tasks yet</p>;
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTodoItem={this.addTodoItem} />
        </header>
        <section className="main">
          {noTasks}
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
