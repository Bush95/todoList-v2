import React from 'react';
import ReactDom from 'react-dom';

const ToDoInput = React.createClass({
  _submit: function (event) {
    event.preventDefault();
    let input = this.refs.text_input;
    if (input.value) {
      let text = input.value;
      this.props.newItemF(text.replace(/\|/g, '\u01C0'));
      input.value = '';
    }
  },
  _click: function () {
    this.refs.text_input.focus();
  },
  render: function () {
    return (
      <form className="todo__input" onSubmit={this._submit} autoComplete="off">
        <input
          className="todo__text-input"
          type="text"
          placeholder={this.props.text}
          maxLength={this.props.length}
          ref="text_input">
        </input>
        <button
          className="todo__text-submit"
          type="submit"
          onClick={this._click}>{this.props.btntext}</button>
      </form>
    )
  }
});

export default ToDoInput;
