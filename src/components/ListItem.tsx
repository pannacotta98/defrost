import React from 'react';

// TODO The items are too wide

export default function ListItem() {
  return (
    <a href="#" className="panel-block columns is-mobile">
      <div className="column">
        <h2 className="is-size-5">Food item</h2>
        <p>Expiration date</p>
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
}
