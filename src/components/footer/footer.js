import React, { Component } from "react";

export default class Footer extends Component {
  static defaultProps = {
    onShowAll: () => {},
    onShowActive: () => {},
    onShowCompleted: () => {},
    onClearCompleted: () => {},
  };
  state = {
    status: "selected",
    selectedtBtn: "",
  };

  isPressed = React.createRef();
  onClick = (e) => {
    const isPressedBtn = e.target;

    this.setState(({ selectedtBtn, status }) => {
      selectedtBtn.className = "";
      isPressedBtn.className = status;
      return {
        selectedtBtn: isPressedBtn,
      };
    });
  };
  componentDidMount() {
    this.setState({ selectedtBtn: this.isPressed.current });
  }
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
            <button
              className={this.state.status}
              ref={this.isPressed}
              onClick={onShowAll}
            >
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
