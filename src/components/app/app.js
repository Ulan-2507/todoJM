import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Context } from "../context/constext.js";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

const App = () => {
  const status = {
    COMPLETED: "completed",
    EDITING: "editing",
    RUN: "run",
    STOP: "stop",
  };
  let [data, setData] = useState([]);

  const createTodoItem = (label, className = "") => {
    return {
      className,
      label,
      show: true,
      id: uuidv4(),
      createdDate: new Date().toString(),
      trackStatus: status.STOP,
      time: {
        seconds: 0,
        minutes: 0,
        hours: 0,
      },
    };
  };

  const findTodoItem = (id) => {
    const idx = data.findIndex((el) => el.id === id);
    return [data[idx], idx];
  };
  const update = ({ id, className, time, trackStatus }) => {
    const [oldItem, idx] = findTodoItem(id);
    let newItem;
    if (className) {
      newItem = {
        ...oldItem,
        className: oldItem.className === className ? "" : className,
      };
    }
    if (time) {
      newItem = { ...oldItem, time };
    }
    if (trackStatus) {
      newItem = { ...oldItem, trackStatus };
    }
    setData((data) => [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]);
  };

  const updateLabel = (id, label, className = "") => {
    const [oldItem, idx] = findTodoItem(id);
    const newItem = { ...oldItem, label, className };
    setData((data) => [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]);
  };
  const updateTimeTrack = (id, time) => {
    update({ id, time });
  };
  const updateRunTrack = (id, trackStatus) => {
    update({ id, trackStatus });
  };
  const toComplete = (id, className = status.COMPLETED) => {
    const [oldItem, idx] = findTodoItem(id);

    const newItem = {
      ...oldItem,
      trackStatus: status.STOP,
      className: oldItem.className === className ? "" : className,
    };

    setData((data) => [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]);
  };
  const editing = (id, className = status.EDITING) => {
    update({ id, className });
  };

  const showAll = () => {
    setData((data) => {
      return data.map((item) => {
        item.show = true;
        return item;
      });
    });
  };
  const show = (className) => {
    showAll();
    setData((data) => {
      return data.map((item) => {
        if (item.className !== className) {
          item.show = false;
        }
        return item;
      });
    });
  };
  const showCompleted = () => {
    show(status.COMPLETED);
  };
  const showActive = () => {
    show("");
  };

  const addTodoItem = (label) => {
    const newItem = createTodoItem(label);
    setData((data) => [...data, newItem]);
    showAll();
  };
  const deleteTodoItem = (id) => {
    setData((data) => data.filter((item) => item.id !== id));
  };
  const clearCompleted = () => {
    setData((data) =>
      data.filter((item) => item.className !== status.COMPLETED)
    );
  };

  useEffect(() => {
    window.onstorage = () => {
      setData(JSON.parse(localStorage.data));
    };
    if (localStorage.data) {
      setData(JSON.parse(localStorage.data));
    }
  }, []);

  useEffect(() => {
    localStorage.data = JSON.stringify(data);
  }, [data]);

  const completedTodoCount = data.filter((item) => item.className !== "")
    .length;
  let isTask = data.length > 0 ? true : false;
  const noTasks = !isTask && <p>there's no tasks yet</p>;

  return (
    <Context.Provider
      value={{
        status,
        toComplete,
        updateLabel,
        editing,
        deleteTodoItem,
        updateTimeTrack,
        updateRunTrack,
        showAll,
        showActive,
        showCompleted,
        clearCompleted,
        addTodoItem,
      }}
    >
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        {noTasks}
        <TaskList todos={data} />
        <Footer
          completedTodoCount={completedTodoCount}
          dataLenght={data.length}
        />
      </section>
    </Context.Provider>
  );
};

export default App;
