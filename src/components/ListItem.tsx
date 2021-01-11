import React from 'react';
import { GroceryItem } from '../logic/GroceryItem';
import { dayDiff } from '../logic/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faExclamation,
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

// TODO The items are too wide

// How many days before expiration date to have warning color
const WARNING_THRES = 7;

const ExpText: React.FC<{ expDate: Date | undefined }> = ({ expDate }) => {
  if (expDate === undefined) {
    return <p>No expiration date</p>;
  } else {
    const expiresInDays = dayDiff(new Date(), expDate);

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
  item: GroceryItem;
}

const ListItem: React.FC<Props> = ({ item }) => {
  return (
    <a href="#" className="panel-block columns is-mobile">
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
    </a>
  );
};

export default ListItem;
