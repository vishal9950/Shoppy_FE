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
    let box;
    if (this.props.item.availableqty === 0) {
      box = (
    <div className="ItemCard-AddBox">
          <div className="ItemCard-Cost">MRP {this.props.item.cost}/-</div>
      <div className="ItemCard-SoldOut">SOLD OUT</div>
    </div>
      );
    } else {
      box = (
        <div className="ItemCard-AddBox">
          <div className="ItemCard-Cost">MRP {this.props.item.cost}/-</div>
          <div className={this.state.itemQty === 0 ? 'Adder' : 'Adder-Color'}>
            <div className="AdderBtn"><button
              className="AdderBtn"
              onClick={this.state.itemQty === 0 ?
              () => { this.doNothing(); } :
              () => { this.decreaseQty(); }}
            >-
                                      </button>
            </div>
            <div className="ItemCard-Adder">
              {this.state.itemQty} in Basket
            </div>
            <div className="AdderBtnRt"><button
              className="AdderBtnRt"
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

    return (
      <div className={this.props.item.availableqty === 0 ? 'ItemCard-Outer-Gray' : 'ItemCard-Outer'}>
        <div className="ItemCard-ImageCenter"><img className="ItemCard-Image" alt={this.props.item.title} src={this.props.item.imageurl} /></div>
        <div className="ItemCard-Item">
          <div className="ItemCard-ItemBrand">{this.props.item.brand.toUpperCase()}</div>
          <div className="ItemCard-ItemTitle">{this.props.item.title}</div>
        <div className="ItemCard-Desc">
          {this.props.item.description}
        </div>
      {box}
        </div>
      </div>
    );
  }
}

export default ItemCard;
