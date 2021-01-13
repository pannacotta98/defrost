import React from 'react';
import { useState } from 'react';
import { GroceryType } from '../logic/GroceryItem';
import { isValidDate } from '../logic/util';

export default function AddItem() {
  const [category, setCategory] = useState(GroceryType.UNSET);
  const [dateString, setDateString] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidDate(event.target.value)) {
      setDateString(event.target.value);
    } else {
      setDateString('invalid');
    }
  };

  return (
    <form className="container">
      <h1 className="title">New item</h1>
      <div className="field">
        <label className="label">Item</label>
        <div className="control">
          <input className="input" type="text" placeholder="Suspicious meat" />
        </div>
      </div>

      {/* TODO Make none an option */}
      <div className="field">
        <label className="label">Expiration date</label>
        <div className="control">
          <input
            className={`input ${dateString === 'invalid' ? 'is-danger' : ''}`}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="yyyy-mm-dd"
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Blippblupp</label>
        <div className="control">
          <div className="buttons">
            {Object.values(GroceryType)
              .filter((item) => item !== GroceryType.UNSET)
              .map((value) => (
                <button
                  type="button"
                  key={value}
                  className={`button ${value === category ? 'is-primary' : ''}`}
                  onClick={() => setCategory(value !== category ? value : GroceryType.UNSET)}
                >
                  {value}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="field mt-6">
        <div className="control">
          <button type="button" className="button is-primary is-medium is-fullwidth" disabled>
            Add item
          </button>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="button" className="button is-primary is-light is-medium is-fullwidth">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
