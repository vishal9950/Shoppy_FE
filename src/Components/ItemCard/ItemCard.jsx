import React from 'react';
import { PropTypes } from 'prop-types';
import './ItemCard.css';

class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQty: 0,
    };
    ItemCard.propTypes = {
      item: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
    };
  }

  doNothing = () => {

  }

  decreaseQty = () => {
    const send = { item_id: this.props.item.item_id, quantity: this.state.itemQty - 1 };
    console.log('send: ', send);
    this.props.onChange('sub', send);
    this.setState({
      itemQty: this.state.itemQty - 1,
    });
  }

  increaseQty = () => {
    const send = { item_id: this.props.item.item_id, quantity: this.state.itemQty + 1 };
    console.log('send: ', send);
    this.props.onChange('add', send);
    this.setState({
      itemQty: this.state.itemQty + 1,
    });
  }

  render() {
    return (
      <div className="ItemCard-Outer">
        <img className="ItemCard-Image" alt={this.props.item.title} src={this.props.item.imageurl} />
        <div className="ItemCard-Item">
          <div>{this.props.item.brand}</div>
          <div>{this.props.item.title}</div>
        </div>
        <div className="ItemCard-Desc">
          {this.props.item.description}
        </div>
        <div className="ItemCard-AddBox">
          <div>MRP {this.props.item.cost}/-</div>
          <div>
            <button
              onClick={this.state.itemQty === 0 ?
              () => { this.doNothing(); } :
              () => { this.decreaseQty(); }}
            >-
            </button>
            <div className="ItemCard-Adder">
              {this.state.itemQty} in Basket
            </div>
            <button
              onClick={this.state.itemQty === this.props.item.availableqty ?
               () => { this.doNothing(); } :
                () => { this.increaseQty(); }}
            >+
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;
