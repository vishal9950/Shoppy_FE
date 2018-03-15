import React from 'react';
import { PropTypes } from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    Header.propTypes = {
      cartItems: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired,
    };
  }

  doNothing = () => {

  }

  render() {
    return (
      <div className="Header-head">
        <div>icon</div>
        <div>E-Shopper</div>
        <div><button>All Orders</button></div>
        <div>
          <button
            onClick={this.props.cartItems === 0 ?
           () => { this.doNothing(); } :
            () => { this.props.onChange(); }}
          >
            <div className="Header-Cart">
              <div>icon</div>
              <div>
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

