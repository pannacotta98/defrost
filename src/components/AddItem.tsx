import React from 'react';

export default function AddItem() {
  return (
    <form className="container mx-3 mt-5 mb-5">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
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

      <div className="field is-grouped mt-6">
        <div className="control">
          <button className="button is-primary">Submit</button>
        </div>
        <div className="control">
          <button className="button is-primary is-light">Cancel</button>
        </div>
      </div>
    </form>
  );
}
