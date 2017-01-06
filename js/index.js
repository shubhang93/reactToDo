"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function prefixZero(val) {
  return val < 10 ? "0" + val : val;
}

function timeStamp() {
  var d = new Date(),
      day = d.getDate(),
      month = d.getMonth() + 1,
      year = d.getFullYear(),
      hours = d.getHours(),
      minutes = d.getMinutes();
  return "Added on - " + prefixZero(day) + "/" + prefixZero(month) + "/" + year + " at " + prefixZero(hours) + ":" + prefixZero(minutes);
}

function InputBox(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "form",
      null,
      React.createElement("input", { type: "text", value: props.inputData, className: "custom-input", onChange: function onChange(e) {
          return props.dataHandler(e);
        }, placeholder: "Enter your To-do task" })
    )
  );
}

function AddItemController(props) {
  return React.createElement(
    "div",
    { className: "item-controller" },
    React.createElement(InputBox, { inputData: props.inputData, dataHandler: props.dataHandler }),
    React.createElement("br", null),
    React.createElement(AddButton, { addHandler: props.addHandler }),
    React.createElement("br", null),
    React.createElement(SaveButton, { saveHandler: props.saveHandler, inputData: props.inputData })
  );
}

function List(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "list" },
      props.inputData,
      React.createElement(
        "span",
        { className: "time-stamp" },
        timeStamp()
      ),
      React.createElement(
        "p",
        { className: "del", onClick: function onClick() {
            return props.deleteItem(props.index);
          } },
        "Delete"
      ),
      React.createElement(
        "p",
        { className: "edit", onClick: function onClick(e) {
            return props.editItem(e, props.index);
          } },
        "Edit"
      )
    ),
    React.createElement("br", null)
  );
}

function SaveButton(props) {
  return React.createElement(
    "button",
    { className: "save-button", onClick: function onClick(e) {
        return props.saveHandler(e);
      } },
    "Save"
  );
}

function AddButton(props) {
  var addHandler = props.addHandler;

  return React.createElement(
    "button",
    { className: "custom-button", onClick: addHandler },
    "Add"
  );
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.deleteList = function (index) {
      console.log(index);
      var items = _this.state.items.slice();
      items = items.filter(function (val, i) {
        return i !== index;
      });
      _this.setState({
        items: items.slice()
      });
    };

    _this.addList = function () {
      console.log("called");
      var inputReset = "";
      var items = _this.state.items.slice();
      var ipData = _this.state.inputData;
      if (ipData === inputReset) {
        return false;
      }
      items.push(ipData);
      _this.setState({
        items: items.slice(),
        inputData: inputReset
      });
    };

    _this.dataHandler = function (e) {
      console.log(e.target.value);
      var data = e.target.value;
      _this.setState({
        inputData: data
      });
    };

    _this.editItem = function (e, index) {
      console.log(index);
      var items = _this.state.items.slice();
      var oldData = items[index];
      _this.setState({
        inputData: oldData,
        modifiedIndex: index
      });
    };

    _this.saveHandler = function (e) {
      console.log("Called save");
      var indexToEdit = _this.state.modifiedIndex;
      var inputReset = "";
      var items = _this.state.items.slice();
      var newData = _this.state.inputData;
      console.log(newData);
      items[indexToEdit] = newData;
      if (newData = +"") return false;
      _this.setState({
        items: items,
        inputData: inputReset
      });
    };

    _this.state = {
      items: [],
      inputData: "",
      modifiedIndex: -1
    };
    return _this;
  }

  App.prototype.render = function render() {
    var _this2 = this;

    console.log("rendering");
    var _state = this.state;
    var items = _state.items;
    var inputData = _state.inputData;

    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(
        "h2",
        null,
        "To-do App using ",
        React.createElement(
          "span",
          { style: { color: "#f25d13" } },
          "React JS"
        )
      ),
      React.createElement("br", null),
      items.map(function (el, i) {
        return React.createElement(List, { key: i, index: i, deleteItem: _this2.deleteList, inputData: el, editItem: _this2.editItem });
      }),
      React.createElement(AddItemController, { addHandler: this.addList, inputData: inputData, dataHandler: this.dataHandler, saveHandler: this.saveHandler })
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));