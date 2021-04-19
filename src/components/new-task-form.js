import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddTodoItem: () => {},
  };
  static propTypes = {
    onAddTodoItem: PropTypes.func,
  };
  state = {
    label: "",
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddTodoItem(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.label}
          onChange={this.onLabelChange}
          autoFocus
        />
      </form>
    );
  }
}
