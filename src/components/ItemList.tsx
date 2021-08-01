import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import serverTypes from '../other/serverTypes';
import ListItem from './ListItem';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebase, firestore } from '../other/firebase';
import SetItem from './SetItem';
import { sortingFunctions } from '../other/sortingFunctions';

interface Props {
  activeListId: string;
  user: firebase.User;
}

const ItemList: React.FC<Props> = ({ activeListId, user }) => {
  // The item currently open in modal, 'closed' if none, or 'new' if adding item
  const [itemModal, setItemModal] = useState<serverTypes.Item | 'new' | 'closed'>('closed');
  // TODO SE TILL ATT KOLLA OM MAN HAR TILLGÅNG INNAN EN REQUEST SKICKAS
  const listQuery = firestore.collection('itemLists').doc(activeListId).collection('items');
  let [items, isLoading, error] = useCollectionData<serverTypes.Item>(listQuery, { idField: 'id' });
  if (!items) items = [];

  const filterCondition = () => true;
  const sortCondition = sortingFunctions.get('oldest first');

  const filteredAndSortedItems = items.filter(filterCondition).sort(sortCondition);

  return (
    <div className="has-navbar-fixed-bottom">
      {/* TODO The layout here is very hacky */}
      <div className="columns mb-6" style={{ marginTop: '-3rem' }}>
        {isLoading ? (
          <div className="loader-wrapper is-active">
            <div className="loader is-loading"></div>
          </div>
        ) : error ? (
          <div>
            <h2 className="subtitle has-text-centered pt-6 has-text-danger">An error occured</h2>
            <p className="has-text-centered has-text-danger">{error.message}</p>
          </div>
        ) : items.length < 1 ? (
          <h2 className="subtitle has-text-centered pt-6">The list is empty</h2>
        ) : filteredAndSortedItems.length < 1 ? (
          <h2 className="subtitle has-text-centered pt-6">No item matches the current filter</h2>
        ) : (
          filteredAndSortedItems.map((item, idx) => (
            <ListItem listId={activeListId} item={item} key={idx} onPress={setItemModal} /> // TODO Use id instead of index probably
          ))
        )}
      </div>
      <div className="navbar is-fixed-bottom is-primary columns is-mobile has-dropdown has-dropdown-up mb-0">
        {/* <button className="button is-multiline is-primary navbar-item column">
          <FontAwesomeIcon icon={faFilter} />
          <p>Filter</p>
        </button> */}
        {/* <button className="button is-multiline is-primary navbar-item column">
          <FontAwesomeIcon icon={faSortAmountUpAlt} />
          <p>Sort</p>
        </button> */}
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
          listId={activeListId}
          closeModal={() => setItemModal('closed')}
          selectedItem={itemModal === 'new' ? null : itemModal}
          user={user}
        />
      )}
    </div>
  );
};

export default ItemList;
