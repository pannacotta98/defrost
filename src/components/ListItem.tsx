import React from 'react';
import { dayDiff } from '../other/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import serverTypes from '../other/serverTypes';
import { firebase } from '../other/firebase';

// TODO The items are too wide

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
  item: serverTypes.Item;
}

const ListItem: React.FC<Props> = ({ item }) => {
  return (
    <label className="panel-block columns is-mobile">
      <div className="column">
        <h2 className="is-size-5">{item.name}</h2>
        <ExpText expDate={item.expiresBy} />
      </div>
      <div className="column is-narrow">
        <div className="field is-grouped">
          <p className="control">
            <button className="button is-primary">&minus;</button>
          </p>
          <p className="control">
            <button className="button is-primary">&times;</button>
          </p>
        </div>
        {/* <div className="field has-addons">
          <div className="control">
            <a className="button is-primary">&minus;</a>
          </div>
          <div className="control">
            <input className="input" type="text" placeholder="?" />
          </div>
          <div className="control">
            <a className="button is-primary">+</a>
          </div>
        </div> */}
      </div>
    </label>
  );
};

export default ListItem;
