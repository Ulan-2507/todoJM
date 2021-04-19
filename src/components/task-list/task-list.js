import React from "react";
import PropTypes from "prop-types";

import Task from "../task";

const TaskList = ({
  todos,
  onCompleted,
  onUpdateLabel,
  onEditing,
  onDeleted,
}) => {
  const elements = todos.map((item) => {
    const { id, className, show, ...itemPorops } = item;
    if (!show) {
      return null;
    }
    return (
      <li key={id} className={className}>
        <Task
          {...itemPorops}
          onCompleted={() => onCompleted(id)}
          onUpdateLabel={(label) => onUpdateLabel(id, label)}
          onEditing={() => onEditing(id)}
          onDeleted={() => onDeleted(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};
TaskList.defaultProps = {
  onCompleted: () => {},
  onUpdateLabel: () => {},
  onEditing: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  onCompleted: PropTypes.func,
  onUpdateLabel: PropTypes.func,
  onEditing: PropTypes.func,
  onDeleted: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.object),
};
export default TaskList;
