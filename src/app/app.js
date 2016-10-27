var React = require("react");
var ReactDom = require("react-dom");

import ToDoHeader from './components/ToDoHeader';
import ToDoList from './components/ToDoList';
import ToDoInput from './components/ToDoInput';
import ToDoFooter from './components/ToDoFooter';

const ToDo = React.createClass({
  getInitialState: function () {
    let storageItems = null;
    let storageId = null
    if (localStorage.items && localStorage.id) {
      storageItems = localStorage.items;
      storageId = parseInt(localStorage.id);
      let itemArr = [];
      storageItems = storageItems.split('|||');
      storageItems.forEach(function(item, index) {
        let newItem = {};
        storageItems[index] = item.split('|');
        newItem.id = parseInt(storageItems[index][0]);
        newItem.checked = (storageItems[index][1] == 'true');
        newItem.text = storageItems[index][2];
        itemArr.push(newItem);
      });
      storageItems = itemArr;
    };
    return ({
      items: storageItems || [],
      id: storageId || 0
    });
  },
  componentDidUpdate: function () {
    let taskStorage = '';
    [...this.state.items].forEach(function (item) {
      taskStorage += item.id + '|';
      taskStorage += item.checked + '|';
      taskStorage += item.text;
      taskStorage += '|||';
    });
    taskStorage = taskStorage.slice(0, -3);
    localStorage.setItem('items', taskStorage);
    localStorage.setItem('id', this.state.id);
  },
  _addItem: function (text) {
    let newItem = {};
    newItem.id = this.state.id;
    newItem.checked = false;
    newItem.text = text;
    let items = [...this.state.items, newItem];
    this.setState({
      items: items,
      id: this.state.id + 1
    });
  },
  _checkItem: function (itemKey, isChecked) {
    let items = [...this.state.items];
    let itemIndex = items.map(item => item.id).indexOf(itemKey);
    items[itemIndex].checked = isChecked;
    this.setState({items: items});
  },
  _removeItem: function (itemKey) {
    let items = [...this.state.items];
    let itemIndex = items.map(item => item.id).indexOf(itemKey);
    items.splice(itemIndex, 1);
    if (items.length == 0) {
      this.setState({
        id: 0,
        items: []
      });
    } else {
      this.setState({items: items});
    }
  },
  _removeCompleted: function () {
    let items = [...this.state.items];
    let notChecked = items.filter(item => item.checked === false);
    if (notChecked.length == 0) {
      this.setState({
        id: 0,
        items: notChecked
      });
    } else {
      this.setState({items: notChecked});
    }
  },
  render: function () {
    return (
      <div className="todo">
        <ToDoHeader
          title="Things to do"/>
        <ToDoList
          items={this.state.items}
          removeItem={this._removeItem}
          checkItem={this._checkItem} />
        <ToDoInput
          text="New todo"
          btntext="Add"
          length="255"
          newItemF={this._addItem}
        />
        <ToDoFooter
          removeCompleted={this._removeCompleted}
          items={this.state.items}/>
      </div>
    )
  }
});

const App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <ToDo/>
      </div>
    )
  }
});

ReactDom.render(<App />, document.getElementById('main'));
