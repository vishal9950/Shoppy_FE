import React from 'react';
import { PropTypes } from 'prop-types';
import './Title.css';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    Title.propTypes = {
      text: PropTypes.string.isRequired,
    };
  }

  render() {
    return (
      <div className="Title-text">
        {this.props.text}
        <hr />
      </div>
    );
  }
}
export default Title;

