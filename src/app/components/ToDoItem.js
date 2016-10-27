import React from 'react';
import ReactDom from 'react-dom';

const ToDoItem = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    itemKey: React.PropTypes.number.isRequired
  },
  componentDidMount: function () {
    let item = this.refs.item;
    setTimeout(() => item.scrollIntoView({block: "end", behavior: "smooth"}), 50);
  },
  _checkItem: function () {
    this.props.checkItem(this.props.itemKey, this.refs.checkbox.checked);
  },
  _delete: function () {
    this.props.removeItem(this.props.itemKey);
  },
  render: function () {
    let classes = 'todo__item';
    if (this.props.checked)
      classes += ' todo__item--checked';
    return (
      <li className={classes}
          ref="item"
          data-key={this.props.itemKey}>
        <label>{this.props.text}
        <input type="checkbox"
               ref="checkbox"
               className="todo__check"
               title="Mark as done"
               onChange={this._checkItem}
               checked={this.props.checked}>
        </input></label>
      {this.props.checked ?
        <button
          type="button"
          className="todo__removeItem"
          title="Remove"
          onClick={this._delete}>
        </button> : ''
       }
      </li>
    )
  }
});

export default ToDoItem;
