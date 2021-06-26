import React from 'react';
import { dayDiff } from '../other/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import serverTypes from '../other/serverTypes';
import { firebase, firestore } from '../other/firebase';
import _ from 'lodash';

// How many days before expiration date to have warning color
const WARNING_THRES = 7;

const ExpText: React.FC<{ expDate: firebase.firestore.Timestamp | null }> = ({ expDate }) => {
  if (expDate === null) {
    return <p>No expiration date</p>;
  } else {
    const expiresInDays = dayDiff(new Date(), expDate.toDate());

    if (expiresInDays === 0) {
      return (
        <p className="has-text-warning-dark">
          <FontAwesomeIcon icon={faExclamationCircle} /> Expires today
        </p>
      );
    } else if (expiresInDays < 0) {
      return (
        <p className="has-text-danger">
          <FontAwesomeIcon icon={faTimes} /> Expired {-expiresInDays} days ago
        </p>
      );
    } else {
      return (
        <p className={expiresInDays < WARNING_THRES ? 'has-text-warning-dark' : ''}>
          {expiresInDays < WARNING_THRES && <FontAwesomeIcon icon={faExclamationCircle} />} Expires
          in {expiresInDays} days
        </p>
      );
    }
  }
};

interface Props {
  list: serverTypes.List;
  item: serverTypes.Item;
  onPress: (item: serverTypes.Item) => void;
}

const ListItem: React.FC<Props> = ({ item, onPress, list }) => {
  return (
    <div className="panel-block columns is-mobile" onClick={() => onPress(item)}>
      <div className="column">
        <h2 className="is-size-5">{item.name}</h2>
        <ExpText expDate={item.expiresBy} />
      </div>
      <div className="column is-narrow">
        <div className="field is-grouped">
          {/* <p className="control">
            <button className="button is-primary">&minus;</button>
          </p> */}
          <p className="control">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (!window.confirm(`Are you sure you want to remove “${item.name}”?`)) {
                  return;
                }
                firestore
                  .collection('itemLists')
                  .doc(list.id)
                  .collection('items')
                  .doc(item.id)
                  .delete()
                  .then(() => {
                    console.log('Removed item', item);
                    // TODO Code below to use for undo functionality maybe
                    // const idStrippedItem = _.cloneDeep(item);
                    // delete idStrippedItem.id;
                    // firestore
                    //   .collection('itemLists')
                    //   .doc(list.id)
                    //   .collection('items')
                    //   .add(idStrippedItem);
                  })
                  .catch((error) => alert(`Could not delete item — ${error.message}`));
              }}
              className="button is-primary"
            >
              &times;
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
