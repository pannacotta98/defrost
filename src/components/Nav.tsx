import React from 'react';
import { auth } from '../logic/firebase';
import SignOut from './SignOut';

export default function Nav() {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="has-text-weight-bold navbar-item">Freezer</h1>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      {/* <div className="navbar-end">
        <div className="navbar-item">Settings</div>
      </div> */}
      {/* <div className="navbar-end">
        <div className="navbar-item has-dropdown is-active is-mobile">
          <a className="navbar-link is-arrowless">Right</a>

          <div className="navbar-dropdown is-right">
            <a className="navbar-item">Overview</a>
            <a className="navbar-item">Elements</a>
            <a className="navbar-item">Components</a>
            <hr className="navbar-divider" />
            <div className="navbar-item">Version 0.9.1</div>
          </div>
        </div>
      </div> */}

      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {auth && (
              <a className="navbar-link">
                {auth.currentUser?.photoURL && (
                  <figure className="image">
                    <img className="is-rounded" src={auth.currentUser.photoURL} />
                  </figure>
                )}
                {auth.currentUser?.displayName}
              </a>
            )}
            <div className="buttons">
              {/* <a className="button is-primary">
                <strong>Sign up</strong>
              </a> */}
              <SignOut />
              {/* <a className="button is-light">Log in</a> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
