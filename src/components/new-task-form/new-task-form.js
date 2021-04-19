import React, { useState, useContext } from "react";
import { Context } from "../context/constext.js";

const NewTaskForm = () => {
  const { addTodoItem } = useContext(Context);
  const [label, setLabel] = useState("");

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoItem(label);
    setLabel("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={label}
        onChange={handleLabelChange}
        autoFocus
      />
    </form>
  );
};

export default NewTaskForm;
