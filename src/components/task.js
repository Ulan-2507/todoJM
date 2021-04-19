import React, { Component } from "react";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export default class Task extends Component {
  state = {
    hidden: true,
    label: this.props.label,
    distanceToNow: 0,
  };
  timeDistance = () => {
    this.setState(({ distanceToNow }) => {
      const distance = formatDistanceToNowStrict(this.props.createdDate);
      console.log(distance);
      return {
        distanceToNow: distance,
      };
    });
  };

  componentDidMount() {
    this.timerId = setInterval(this.timeDistance, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  hide = () => {
    this.props.onEditing();
    this.setState(({ hidden }) => {
      return {
        hidden: !hidden,
      };
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
    this.hide();
  };
  render() {
    const { label, onDeleted, onCompleted } = this.props;
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
          <button className="icon icon-edit" onClick={this.hide}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            value={this.state.label}
            onChange={this.onLabelChange}
            hidden
          />
        </form>
      </>
    );
  }
}
