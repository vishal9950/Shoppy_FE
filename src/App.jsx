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
      items: [],
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

  updateCart = (operator, obj) => {
    console.log('obj: ', obj);
    const { items } = this.state;
    const temp = items;
    if (items.length === 0) {
      console.log('length: ', 0);
      temp.push(obj);
    } else {
      let flag = 1;
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].item_id === obj.item_id) {
          console.log('id found at ::: ', i);
          temp[i].quantity = obj.quantity;
          console.log(temp);
          flag = 0;
          break;
        }
      }
      if (flag === 1) {
        temp.push(obj);
      }
    }
    const newTemp = [];
    for (let i = 0; i < temp.length; i += 1) {
      if (temp[i].quantity !== 0) {
        newTemp.push(temp[i]);
      }
    }
    console.log('temp:::::', temp);
    if (operator === 'add') {
      this.setState({
        cartItems: this.state.cartItems + 1,
        items: newTemp,
      });
    } else {
      this.setState({
        cartItems: this.state.cartItems - 1,
        items: newTemp,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header cartItems={this.state.cartItems} />
        <Container
          inventory={this.state.inventory}
          onChange={(operator, obj) => { this.updateCart(operator, obj); }}
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
