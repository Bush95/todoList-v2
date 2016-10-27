import React from 'react';
import ReactDom from 'react-dom';

const ToDoFooter = React.createClass({
  render: function () {
    let itemsUnchecked = this.props.items.filter(item => item.checked === false);
    let itemsCheckedL = this.props.items.filter(item => item.checked === true).length;
    return (
      <footer className="todo__footer">
        {itemsUnchecked.length > 0 ?
          <span className="todo__remaining">{itemsUnchecked.length} more to do</span>
        : ''}
        {itemsCheckedL > 0 ?
          <a href="#"
             className="todo__clearDone"
             onClick={this.props.removeCompleted}>Clear completed</a>
           : ''}
      </footer>
    )
  }
});

export default ToDoFooter;
