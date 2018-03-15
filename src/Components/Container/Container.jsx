import React from 'react';
import { PropTypes } from 'prop-types';
import CategoryContainer from '../CategoryContainer/CategoryContainer';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    Container.propTypes = {
      inventory: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
    };
  }

  render() {
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
  }
}

export default Container;

