import { faFilter, faPlus, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import serverTypes from '../other/serverTypes';
import ListItem from './ListItem';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../other/firebase';

interface Props {
  activeList: serverTypes.List;
}

const ItemList: React.FC<Props> = ({ activeList }) => {
  // const filterCondition = (item: GroceryItem) => item.type.includes(GroceryType.Bread);
  const listQuery = firestore.collection('itemLists').doc(activeList.id).collection('items');
  let [items, isLoading, error] = useCollectionData<serverTypes.Item>(listQuery);
  if (!items) items = [];

  const filterCondition = () => true;
  const sortCondition = (item1: serverTypes.Item, item2: serverTypes.Item) => {
    if (item1.expiresBy && item2.expiresBy) {
      return item1.expiresBy.toMillis() - item2.expiresBy.toMillis();
    }
    return 0;
  };

  const filteredAndSortedItems = items.filter(filterCondition).sort(sortCondition);

  return (
    <div className="has-navbar-fixed-bottom">
      <div className="columns">
        {items.length < 1 ? (
          <h2 className="subtitle has-text-centered pt-6">The list is empty</h2>
        ) : filteredAndSortedItems.length < 1 ? (
          <h2 className="subtitle has-text-centered pt-6">No item matches the current filter</h2>
        ) : (
          filteredAndSortedItems.map((item, idx) => (
            <ListItem item={item} key={idx} /> // TODO Use id instead of index probably
          ))
        )}
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
