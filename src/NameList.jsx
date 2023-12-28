import React, { Component } from "react";
import "./NameList.css";

class NameList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: [],
      newName: "",
    };
  }

  componentDidMount() {
    const savedNames = JSON.parse(localStorage.getItem("names")) || [];
    this.setState({ names: savedNames });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.names !== this.state.names) {
      localStorage.setItem("names", JSON.stringify(this.state.names));
    }
  }

  addName = () => {
    const { newName, names } = this.state;

    if (newName.trim() !== "") {
      this.setState({
        names: [...names, newName.trim()],
        newName: "",
      });
    }
  };

  removeName = (index) => {
    const updatedNames = this.state.names.filter((_, i) => i !== index);
    this.setState({ names: updatedNames });
  };

  render() {
    const { newName, names } = this.state;

    return (
      <div className="name-list-container">
        <h2 className="name-list-title">Список имён</h2>
        <input
          className="name-input"
          type="text"
          value={newName}
          onChange={(e) => this.setState({ newName: e.target.value })}
          placeholder="Введите имя"
        />
        <button className="name-list-button" onClick={this.addName}>
          Добавить
        </button>
        <ul>
          {names.map((name, index) => (
            <li key={index} className="name-item">
              {name}
              <button
                className="remove-button"
                onClick={() => this.removeName(index)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default NameList;
