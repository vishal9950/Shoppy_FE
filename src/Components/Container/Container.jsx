import React from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import Title from '../Title/Title';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Your Basket',
    };
    Container.propTypes = {
      inventory: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
      page: PropTypes.string.isRequired,
      cartItems: PropTypes.number.isRequired,
      items: PropTypes.array.isRequired,
      onChangePage: PropTypes.func.isRequired,
    };
  }

  checkout = () => {
    const items = this.props.items.map(item => ({
      item_id: item.item_id,
      quantity: item.quantity,
    }));
    const options = {
      url: '/orders',
      method: 'POST',
      data: {
        items: JSON.stringify(items),
      },
    };
    axios(options).then((value) => {
      alert(value.data);
      if (value.data === 'Order Placed') {
        this.props.onChangePage();
      }
    });
    // console.log(items);
  }

  doNothing = () => {

  }

  deleteItem = (itemId, quantity) => {
    this.props.onChange('', { item_id: itemId, quantity });
  }

  render() {
    if (this.props.page === 'home') {
      const { inventory } = this.props;
      const categorizedItems = inventory.reduce((accumulator, currentValue) => {
        const acc = accumulator;
        acc[currentValue.category] = acc[currentValue.category] || [];
        acc[currentValue.category].push(currentValue);
        return acc;
      }, []);
      // console.log(categorizedItems);
      // console.log(categorizedItems.Dairy);
      const categories = Object.keys(categorizedItems);
      // console.log(categories);
      const cardRows = [];
      for (let i = 0; i < categories.length; i += 1) {
        //   console.log(categorizedItems[categories[i]]);
        cardRows.push(<CategoryContainer
          key={i}
          item={categorizedItems[categories[i]]}
          onChange={(operator, obj) => { console.log('Container:::', obj); this.props.onChange(operator, obj); }}
        />);
        //   for (let j = 0; j < categorizedItems[categories[i]].length; j += 1) {
        //     console.log(
        //       categorizedItems[categories[i]][j].item_id,
        //       categorizedItems[categories[i]][j].category,
        //     );
        //   }
      }
      return (
        <div>{cardRows}</div>
      );
    } else if (this.props.page === 'checkout') {
      let itemsCart;
      if (this.props.cartItems < 10) {
        itemsCart = `0${this.props.cartItems}`;
      } else {
        itemsCart = `${this.props.cartItems}`;
      }
      const { items, inventory } = this.props;
      const tempItems = items;
      for (let i = 0; i < tempItems.length; i += 1) {
        for (let j = 0; j < inventory.length; j += 1) {
          if (tempItems[i].item_id === inventory[j].item_id) {
            tempItems[i].category = inventory[j].category;
            tempItems[i].cost = inventory[j].cost;
            tempItems[i].brand = inventory[j].brand;
            tempItems[i].title = inventory[j].title;
            break;
          }
        }
      }
      const categorizedItems = tempItems.reduce((accumulator, currentValue) => {
        const acc = accumulator;
        acc[currentValue.category] = acc[currentValue.category] || [];
        acc[currentValue.category].push(currentValue);
        return acc;
      }, []);
      console.log(categorizedItems);
      const categories = Object.keys(categorizedItems);
      const itemRows = [];
      let total = 0;
      for (let i = 0; i < categories.length; i += 1) {
        console.log(categories[i]);
        itemRows.push(<div className="Container-ItemCategory">
          {categories[i]}
                      </div>);
        const item = categorizedItems[categories[i]];
        for (let j = 0; j < item.length; j += 1) {
          itemRows.push(<div className="Container-ItemDetails">
            <div>
              <div>{item[j].brand}</div>
              <div>{item[j].title}</div>
            </div>
            <div>
                Rs. {item[j].cost}
            </div>
            <div>
              {item[j].quantity}
            </div>
            <div>
              {item[j].cost * item[j].quantity}
            </div>
            <div>
              <button
                onClick={() => { this.deleteItem(item[j].item_id, item[j].quantity); }}
              >x
              </button>
            </div>
            <div />
                        </div>);
          total += item[j].cost * item[j].quantity;
        }
        // for(let j = 0;j<categorizedItems[i][j])
      }
      return (
        <div>
          <Title text={`${this.state.text} (${itemsCart} items)`} />
          <div>{itemRows}
          </div>
          <div className="Container-CheckoutBox">
            <div>Total Rs. {total}</div>
            <hr />
            <button
              className="Container-Checkout-btn"
              onClick={total === 0 ?
              () => { this.doNothing(); } :
              () => { this.checkout(); }}
            >Checkout
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
          <Title text="All Orders" />
      </div>
    );
  }
}

export default Container;

