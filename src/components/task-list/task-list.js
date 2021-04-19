import React from "react";
import PropTypes from "prop-types";

import Task from "../task";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, className, show } = item;
    if (show) {
      return (
        <li key={id} className={className}>
          <Task {...item} />
        </li>
      );
    }
    return null;
  });

  return <ul className="todo-list">{elements}</ul>;
};
TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
};

export default TaskList;
