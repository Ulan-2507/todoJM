import React, { Component } from "react";

export default class Footer extends Component {
  static defaultProps = {
    onShowAll: () => {},
    onShowActive: () => {},
    onShowCompleted: () => {},
    onClearCompleted: () => {},
  };
  state = {
    stateBtn: "selected",
    selectedtBtn: "",
  };

  onClick = (e) => {
    const checkedBtn = document.querySelector(".selected");
    const btn = e.target;

    this.setState(({ selectedtBtn, stateBtn }) => {
      if (btn === checkedBtn) {
        btn.className = "";
      }
      if (selectedtBtn) {
        selectedtBtn.className = "";
      }
      checkedBtn.className = "";
      btn.className = stateBtn;
      return {
        selectedtBtn: btn,
      };
    });
  };
  render() {
    const {
      toDo,
      onShowAll,
      onShowActive,
      onShowCompleted,
      onClearCompleted,
    } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <ul className="filters" onClick={this.onClick}>
          <li>
            <button className={this.state.stateBtn} onClick={onShowAll}>
              All
            </button>
          </li>
          <li>
            <button onClick={onShowActive}>Active</button>
          </li>
          <li>
            <button onClick={onShowCompleted}>Completed</button>
          </li>
        </ul>
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
