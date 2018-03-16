import React from 'react';
import { PropTypes } from 'prop-types';
import ItemCard from '../ItemCard/ItemCard';
import './CategoryContainer.css';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    CategoryContainer.propTypes = {
      item: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
    };
  }

  render() {
    const { item } = this.props;
    const cardRows = [];
    for (let i = 0; i < item.length; i += 1) {
      cardRows.push(<ItemCard
        key={item[i].item_id}
        item={item[i]}
        onChange={(operator, obj) => { console.log('catCont:::', obj); this.props.onChange(operator, obj); }}
        className="CategoryContainer-ItemCard"
      />);
    }
    return (
      <div className="CategoryContainer-Outer">
        <div className="CategoryContainer-Category">
        <div className="CategoryContainer-Cat">{this.props.item[0].category}</div>
        <div className="CategoryContainer-CardRows">{cardRows}</div>
        </div>
      </div>
    );
  }
}

export default CategoryContainer;
