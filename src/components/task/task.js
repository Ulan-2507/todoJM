import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Timer from "../timer";
import { Context } from "../context/constext.js";

const Task = ({ label, createdDate, trackStatus, time, id, className }) => {
  const {
    status,
    toComplete,
    updateLabel,
    editing,
    deleteTodoItem,
  } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [distanceToNow, setDistanceToNow] = useState(0);

  const handleEdit = () => {
    editing(id);
    setEdit((edit) => !edit);
  };
  const handleLabelChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLabel(id, inputValue);
    setEdit((edit) => !edit);
  };
  const handleToggle = () => {
    toComplete(id);
  };
  useEffect(() => {
    setInputValue(label);
    const interval = setInterval(() => {
      setDistanceToNow(formatDistanceToNowStrict(new Date(createdDate)));
    }, 1000);
    return () => clearInterval(interval);
  }, [label, setDistanceToNow, createdDate]);

  const editInput = edit && (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="edit"
        value={inputValue}
        onChange={handleLabelChange}
        autoFocus
      />
    </form>
  );
  const isCompleted = className === status.COMPLETED ? true : false;
  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={handleToggle}
          checked={isCompleted}
        />
        <label>
          <span className="description" onClick={handleToggle}>
            {label}
          </span>
          <span className="created">created {distanceToNow} ago</span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit}></button>
        <button
          className="icon icon-destroy"
          onClick={() => deleteTodoItem(id)}
        ></button>
      </div>
      {editInput}
      <Timer
        id={id}
        time={time}
        trackStatus={trackStatus}
        className={className}
      />
    </>
  );
};

Task.defaultProps = {
  label: "",
  createdDate: new Date().toString(),
  trackStatus: "stop",
  time: {
    seconds: 0,
    minutes: 0,
    hours: 0,
  },
};

Task.propTypes = {
  label: PropTypes.string,
  createdDate: PropTypes.string,
  trackStatus: PropTypes.string,
  time: PropTypes.object,
};
export default Task;
