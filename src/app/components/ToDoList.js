import React from 'react';
import ReactDom from 'react-dom';

import ToDoItemHolder from './ToDoItemHolder';
import ToDoItem from './ToDoItem';

const ToDoList = React.createClass({
  render: function () {
    return (
      <ul className="todo__list">
        {this.props.items.length != 0 ? '' : <ToDoItemHolder text="Nothing there yet!" />}
        {this.props.items.map((item) =>
          <ToDoItem
                checkItem={this.props.checkItem}
                removeItem={this.props.removeItem}
                text={item.text}
                itemKey={item.id}
                key={item.id}
                checked={item.checked}/>
         )}
      </ul>
    )
  }
});

export default ToDoList;
