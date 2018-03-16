import React from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import './Container.css';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import Title from '../Title/Title';

const compare = (a, b) => {
  if (a.availableqty < b.availableqty) {
    return 1;
  }
  if (a.availableqty > b.availableqty) {
    return -1;
  }
  return 0;
};
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Your Basket',
    //   allOrders: [],
    };
    Container.propTypes = {
      inventory: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
      page: PropTypes.string.isRequired,
      cartItems: PropTypes.number.isRequired,
      items: PropTypes.array.isRequired,
      onChangePage: PropTypes.func.isRequired,
      allOrders: PropTypes.func.isRequired,
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

      console.log('categories::::', categories);
      const cardRows = [];
      for (let i = 0; i < categories.length; i += 1) {
        categorizedItems[categories[i]].sort(compare);
        console.log('categorizedItems[categories[i]]::::', categorizedItems[categories[i]]);
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
        <div className="ContainerHome-Main">{cardRows}</div>
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
            <div className="Container-CatName">
              <div className="Container-CatName"><span className="Container-Brand">{item[j].brand.toUpperCase()}</span></div>
              <div className="Container-CatName"><span className="Container-Title">{item[j].title}</span></div>
            </div>
            <div className="Container-CatName" />
            <div className="Container-CatName" />
            <div className="Container-CatName">
                Rs. {item[j].cost}
            </div>
            <div className="Container-CatName">
              {item[j].quantity}
            </div>
            <div className="Container-CatName">
              Rs. {item[j].cost * item[j].quantity}
            </div>
            <div className="Container-CatName">
              <button
                onClick={() => { this.deleteItem(item[j].item_id, item[j].quantity); }}
              >x
              </button>
            </div>
                        </div>);
          total += item[j].cost * item[j].quantity;
        }
        // for(let j = 0;j<categorizedItems[i][j])
      }
      return (
        <div className="ContainerCheckout-Main">
          <Title text={`${this.state.text} (${itemsCart} items)`} />
          <div className="Checkout-Head">
            <div className="Container-CatName">ITEM DESCRIPTION</div>
            <div className="Container-CatName" />
            <div className="Container-CatName" />
            <div className="Container-CatName">UNIT PRICE</div>
            <div className="Container-CatName">QUANTITY</div>
            <div className="Container-CatName">SUBTOTAL</div>
            <div className="Container-CatName" />
          </div>
          <div>{itemRows}
          </div>
          <div className="Container-CheckoutBox">
            <div className="ContainerTotal"><div className="ContainerTotalLeft">TOTAL</div><div className="ContainerTotalRight"> Rs. {total}</div></div>
            <hr />
            <button
              className="Container-Checkout-btn"
              onClick={total === 0 ?
              () => { this.doNothing(); } :
              () => { this.checkout(); }}
            >CHECKOUT
            </button>
          </div>
        </div>
      );
    }

    const total = [];
    const insideRows = [];
    insideRows.push(<div className="Items_Header">
            <div>ITEM DESCRIPTION</div>
            <div>UNIT PRICE</div>
            <div>QUANTITY</div>
            <div>SUB TOTAL</div>
                    </div>);
    for (let i = 0; i < this.props.allOrders.length; i += 1) {
      let tot = 0;
      //   const inRow = [];
      for (let j = 0; j < this.props.allOrders[i].length; j += 1) {
        let k;
        for (k = 0; k < this.props.inventory.length; k += 1) {
          if (this.props.inventory[k].item_id === this.props.allOrders[i][j].item_id) {
            tot += this.props.inventory[k].cost;
          }
        //     }
        //   }
        }
      }
      total.push(tot);
    }

    const { allOrders, inventory } = this.props;
    const inRow = [];
    for (let k = 0; k < allOrders.length; k += 1) {
      const tempItems = allOrders[k];
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
      for (let i = 0; i < categories.length; i += 1) {
        console.log(categories[i]);
        itemRows.push(<div className="Container-ItemCategory">
          {categories[i]}
                      </div>);
        const item = categorizedItems[categories[i]];
        for (let j = 0; j < item.length; j += 1) {
          itemRows.push(<div className="Container-ItemDetails">
            <div className="Container-CatName">
              <div className="Container-CatName"><span className="Container-Brand">{item[j].brand.toUpperCase()}</span></div>
              <div className="Container-CatName"><span className="Container-Title">{item[j].title}</span></div>
            </div>
            <div className="Container-CatName" />
            <div className="Container-CatName" />
            <div className="Container-CatName">
                Rs. {item[j].cost}
            </div>
            <div className="Container-CatName">
              {item[j].quantity}
            </div>
            <div className="Container-CatName">
              {item[j].cost * item[j].quantity}
            </div>
                        </div>);
        }
      // for(let j = 0;j<categorizedItems[i][j])
      }
      inRow.push(itemRows);
      console.log(itemRows);
    }
    const itemsHead = (
      <div className="Checkout-Head-Blue">
          <div className="Container-CatName">ITEM DESCRIPTION</div>
          <div className="Container-CatName" />
          <div className="Container-CatName" />
          <div className="Container-CatName">UNIT PRICE</div>
          <div className="Container-CatName">QUANTITY</div>
          <div className="Container-CatName">SUBTOTAL</div>
          <div className="Container-CatName" />
      </div>
    );
    const allOrderRows = [];
    allOrderRows.push(<div className="">Past Orders ({this.props.allOrders.length})</div>);
    for (let i = 0; i < this.props.allOrders.length; i += 1) {
      allOrderRows.push(<div>
          <div className="Order-Head">
                <div>ORDER ID</div>
                <div>ITEMS</div>
                <div>DATE</div>
                <div>AMOUNT</div>
          </div>
          <div>
            <div className="OrderDetails">
              <div>Order ID: {this.props.allOrders[i][0].order_id}</div>
              <div>{this.props.allOrders.length} items</div>
              <div>{this.props.allOrders[i][0].createdAt}</div>
              <div>{total[i]}</div>
            </div>
              <div>
                {itemsHead}
                    {inRow[i]}
              </div>
            <div className="OrderDetailsTotal"><div /><div /><div>Total</div><div> Rs.{total[i]}</div></div>
          </div>

                        </div>);
    }
    return (<div className="ContainerCheckout-Main">
          <Title text="All Orders" />
            {allOrderRows}
            </div>);
  }
}

export default Container;

