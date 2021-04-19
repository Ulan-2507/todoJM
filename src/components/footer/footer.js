import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../context/constext.js";

const Footer = ({ completedTodoCount, dataLenght }) => {
  const { showAll, showActive, showCompleted, clearCompleted } = useContext(
    Context
  );
  const [btn, setBtn] = useState(null);
  const STATUS = "selected";

  const defaultPressedBtn = useRef(null);
  const handleClick = (e) => {
    const pressedBtn = e.target;
    btn.className = "";
    pressedBtn.className = STATUS;
    setBtn(pressedBtn);
  };

  useEffect(() => {
    defaultPressedBtn.current.click();
  }, [dataLenght]);

  useEffect(() => {
    setBtn(defaultPressedBtn.current);
  }, []);

  return (
    <footer className="footer">
      <span className="todo-count">{completedTodoCount} items left</span>
      <ul className="filters" onClick={handleClick}>
        <li>
          <button
            className={STATUS}
            ref={defaultPressedBtn}
            onClick={() => showAll()}
          >
            All
          </button>
        </li>
        <li>
          <button onClick={() => showActive()}>Active</button>
        </li>
        <li>
          <button onClick={() => showCompleted()}>Completed</button>
        </li>
      </ul>
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  completedTodoCount: 0,
};

Footer.propTypes = {
  completedTodoCount: PropTypes.number,
};

export default Footer;
