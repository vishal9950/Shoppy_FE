// import React from 'react';
// import { PropTypes } from 'prop-types';

// class TableComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//     TableComponent.propTypes = {
//       categorizedItems: PropTypes.object.isRequired,
//       onChange: PropTypes.func.isRequired,
//     };
//   }

//   totalCost = (total) => {
//     this.props.onChange(total);
//   }

//   render() {
//     const { categorizedItems } = this.props;
//     const categories = Object.keys(categorizedItems);
//     const itemRows = [];
//     let total = 0;
//     for (let i = 0; i < categories.length; i += 1) {
//       console.log(categories[i]);
//       itemRows.push(<div className="Container-ItemCategory">
//         {categories[i]}
//                     </div>);
//       const item = categorizedItems[categories[i]];
//       for (let j = 0; j < item.length; j += 1) {
//         itemRows.push(<div className="Container-ItemDetails">
//           <div>
//             <div>{item[j].brand}</div>
//             <div>{item[j].title}</div>
//           </div>
//           <div>
//               Rs. {item[j].cost}
//           </div>
//           <div>
//             {item[j].quantity}
//           </div>
//           <div>
//             {item[j].cost * item[j].quantity}
//           </div>
//           <div>
//             <button
//               onClick={() => { this.deleteItem(item[j].item_id, item[j].quantity); }}
//             >x
//             </button>
//           </div>
//           <div />
//                       </div>);
//         total += item[j].cost * item[j].quantity;
//       }
//     }
//     return (
//           <div>{itemRows}</div>
//     );
//   }
// }

// export default TableComponent;
