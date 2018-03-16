import React from 'react';
import { PropTypes } from 'prop-types';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    Header.propTypes = {
      cartItems: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired,
      onChangePage: PropTypes.func.isRequired,
    };
  }

  doNothing = () => {

  }

  render() {
    return (
      <div className="Header-head">
        <div><i className="material-icons">shopping_cart</i></div>
        <div className="Header-Name">E-Shopper</div>
        <div className="Header-BtnRt"><button
          className="Header-AllOrdersBtn"
          onClick={() => { this.props.onChangePage(); }}
        >All Orders
                                      </button>
        </div>
        <div className="Header-CustomBtnRt">
          <button
            onClick={this.props.cartItems === 0 ?
           () => { this.doNothing(); } :
            () => { this.props.onChange(); }}
            className="Header-CustomBtnRight"
          >
            <div className="Header-Cart">
              <div><i className="material-icons IconColor">shopping_basket</i></div>
              <div className="Header-Cart-Text">
                <div>My Basket</div>
                <div>{this.props.cartItems} items</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;

