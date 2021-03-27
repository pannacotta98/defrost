import { faFilter, faPlus, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import serverTypes from '../other/serverTypes';
import ListItem from './ListItem';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../other/firebase';
import SetItem from './SetItem';

type FilterFunction = (item: serverTypes.Item) => boolean;

interface Props {
  activeList: serverTypes.List;
  user: serverTypes.User;
}

const ItemList: React.FC<Props> = ({ activeList, user }) => {
  // The item currently open in modal, 'closed' if none, or 'new' if adding item
  const [itemModal, setItemModal] = useState<serverTypes.Item | 'new' | 'closed'>('closed');

  const listQuery = firestore.collection('itemLists').doc(activeList.id).collection('items');
  let [items, isLoading, error] = useCollectionData<serverTypes.Item>(listQuery, { idField: 'id' });
  if (!items) items = [];

  // const filterCondition = (item: GroceryItem) => item.type.includes(GroceryType.Bread);

  const filterCondition = () => true;
  const sortCondition = (item1: serverTypes.Item, item2: serverTypes.Item) => {
    if (item1.expiresBy && item2.expiresBy)
      return item1.expiresBy.toMillis() - item2.expiresBy.toMillis();
    else if (item1.expiresBy && !item2.expiresBy) return -1;
    else if (!item1.expiresBy && item2.expiresBy) return 1;
    return 0;
  };

  const filteredAndSortedItems = items.filter(filterCondition).sort(sortCondition);

  return (
    <div className="has-navbar-fixed-bottom">
      {/* TODO The layout here is very hacky */}
      <div className="columns mb-6" style={{ marginTop: '-3rem' }}>
        {isLoading && (
          <div className="loader-wrapper is-active">
            <div className="loader is-loading"></div>
          </div>
        )}

        {!isLoading &&
          (items.length < 1 ? (
            <h2 className="subtitle has-text-centered pt-6">The list is empty</h2>
          ) : filteredAndSortedItems.length < 1 ? (
            <h2 className="subtitle has-text-centered pt-6">No item matches the current filter</h2>
          ) : (
            filteredAndSortedItems.map((item, idx) => (
              <ListItem list={activeList} item={item} key={idx} onPress={setItemModal} /> // TODO Use id instead of index probably
            ))
          ))}
      </div>
      <div className="navbar is-fixed-bottom is-primary columns is-mobile has-dropdown has-dropdown-up mb-0">
        <button className="button is-multiline is-primary navbar-item column">
          <FontAwesomeIcon icon={faFilter} />
          <p>Filter</p>
        </button>
        <button className="button is-multiline is-primary navbar-item column">
          <FontAwesomeIcon icon={faSortAmountUpAlt} />
          <p>Sort</p>
        </button>
        <button
          onClick={() => setItemModal('new')}
          className="button is-multiline is-primary navbar-item column"
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>Add item</p>
        </button>
      </div>

      {itemModal !== 'closed' && (
        <SetItem
          list={activeList}
          closeModal={() => setItemModal('closed')}
          selectedItem={itemModal === 'new' ? null : itemModal}
          user={user}
        />
      )}
    </div>
  );
};

export default ItemList;
