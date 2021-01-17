import { faFilter, faPlus, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { GroceryItem } from '../other/GroceryItem';
import ListItem from './ListItem';

interface Props {
  items: GroceryItem[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  // const filterCondition = (item: GroceryItem) => item.type.includes(GroceryType.Bread);
  const filterCondition = () => true;
  const sortCondition = (item1: GroceryItem, item2: GroceryItem) => {
    if (item1.expiresBy && item2.expiresBy) {
      return item1.expiresBy.getTime() - item2.expiresBy.getTime();
    }
    return 0;
  };

  const filteredAndSortedItems = items.filter(filterCondition).sort(sortCondition);

  return (
    <div className="has-navbar-fixed-bottom">
      <div className="columns">
        {filteredAndSortedItems.map((item, idx) => (
          <ListItem item={item} key={idx} /> // TODO Use id instead of index probably
        ))}
      </div>
      <div className="navbar is-fixed-bottom is-primary columns is-mobile has-dropdown has-dropdown-up mb-0">
        <button className="button is-multiline is-primary navbar-item column">
          <FontAwesomeIcon icon={faFilter} />
          <p>Filter</p>
        </button>
        {/* <div className="navbar-dropdown">
          <a className="navbar-item">Overview</a>
          <a className="navbar-item">Elements</a>
          <a className="navbar-item">Components</a>
          <hr className="navbar-divider" />
          <div className="navbar-item">Version 0.9.1</div>
        </div> */}
        <button className="button is-multiline is-primary navbar-item column">
          <FontAwesomeIcon icon={faSortAmountUpAlt} />
          <p>Sort</p>
        </button>
        <button className="button is-multiline is-primary navbar-item column">
          <FontAwesomeIcon icon={faPlus} />
          <p>Add item</p>
        </button>
      </div>
    </div>
  );
};

export default ItemList;
