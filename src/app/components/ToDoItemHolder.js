import React from 'react';
import ReactDom from 'react-dom';

const ToDoItemHolder = React.createClass({
  render: function () {
    return (
      <li className="todo__item_empty">{this.props.text}</li>
    )
  }
});

export default ToDoItemHolder;
