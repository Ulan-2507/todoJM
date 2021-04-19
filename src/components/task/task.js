import React, { Component } from "react";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export default class Task extends Component {
  state = {
    edit: false,
    label: "",
    distanceToNow: 0,
  };
  timeDistance = () => {
    this.setState(() => {
      const distance = formatDistanceToNowStrict(
        new Date(this.props.createdDate)
      );
      return {
        distanceToNow: distance,
      };
    });
  };
 
  componentDidMount() {
    this.timerId = setInterval(this.timeDistance, 1000);
    this.setState({ label: this.props.label });
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  toEdit = () => {
    this.props.onEditing();
    this.setState({
      edit: !this.state.edit,
    });
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateLabel(this.state.label);
    this.toEdit();
  };
  render() {
    const { label, onDeleted, onCompleted } = this.props;
    const editInput = this.state.edit && (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="edit"
          value={this.state.label}
          onChange={this.onLabelChange}
          autoFocus
        />
      </form>
    );
    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={onCompleted}>
              {label}
            </span>
            <span className="created">
              created {this.state.distanceToNow} ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.toEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editInput}
      </>
    );
  }
}
