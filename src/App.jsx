import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './Components/Header/Header';
import Container from './Components/Container/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      cartItems: 0,
    };
    this.getInventory();
  }

  getInventory = () => {
    axios.get('/inventory').then((inventory) => {
      this.setState({
        inventory: this.state.inventory.concat(inventory.data),
      });
    });
  }

  updateCart = (operator) => {
    if (operator === 'add') {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems + 1,
      });
    } else {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems - 1,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header cartItems={this.state.cartItems} />
        <Container
          inventory={this.state.inventory}
          onChange={(operator) => { this.updateCart(operator); }}
        />
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
};

export default render;
