import React from 'react';

export default function AddItem() {
  return (
    <form className="container">
      <h1 className="title">New item</h1>
      <div className="field">
        <label className="label">Item</label>
        <div className="control">
          <input className="input" type="text" placeholder="Suspicious meat" />
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
            <button className="button">One</button>
            <button className="button">Two</button>
            <button className="button">Three</button>
            <button className="button">Four</button>
            <button className="button">Five</button>
            <button className="button">Six</button>
            <button className="button">Seven</button>
            <button className="button">Eight</button>
            <button className="button">Nine</button>
            <button className="button">Ten</button>
            <button className="button">Eleven</button>
          </div>
        </div>
      </div>

      <div className="field mt-6">
        <div className="control">
          <button className="button is-primary is-medium is-fullwidth">Add item</button>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary is-light is-medium is-fullwidth">Cancel</button>
        </div>
      </div>
    </form>
  );
}
