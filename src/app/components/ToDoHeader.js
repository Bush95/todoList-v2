import React from 'react';
import ReactDom from 'react-dom';

const ToDoHeader = React.createClass({
  render: function () {
    return (
      <h1 className="todo__header">{this.props.title}</h1>
    )
  }
});

export default ToDoHeader;
