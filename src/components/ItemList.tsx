import React from 'react';
import { GroceryItem } from '../logic/GroceryItem';
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
    <>
      <div>
        {filteredAndSortedItems.map((item, idx) => (
          <ListItem item={item} key={idx} /> // TODO Use id instead of index probably
        ))}
      </div>
      <div className="navbar is-fixed-bottom is-primary columns is-mobile has-dropdown has-dropdown-up">
        <button className="navbar-item column">Hej 1</button>
        {/* <div className="navbar-dropdown">
          <a className="navbar-item">Overview</a>
          <a className="navbar-item">Elements</a>
          <a className="navbar-item">Components</a>
          <hr className="navbar-divider" />
          <div className="navbar-item">Version 0.9.1</div>
        </div> */}
        <button className="navbar-item column">Hej 2</button>
        <button className="navbar-item column">Hej 3</button>
      </div>
    </>
  );
};

export default ItemList;
