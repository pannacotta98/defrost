import { faPlus, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { auth } from '../logic/firebase';
import CreateList from './CreateList';
import SignOut from './SignOut';

interface Props {
  activeListId: null | string;
  setActiveListId: (listId: string) => void;
}

const Nav: React.FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  return (
    <>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1 className="has-text-weight-bold navbar-item">Freezer</h1>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            // aria-expanded="false" // TODO
            data-target="navbarBasicExample"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Selected list</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">My great list</a>

                <hr className="navbar-divider" />

                <CreateList />

                {/* <a className="navbar-item">
                  <FontAwesomeIcon icon={faShareAlt} />
                  &nbsp;&nbsp;List sharing
                </a> */}
              </div>
            </div>
          </div>

          <hr className="" />

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
    </>
  );
};

export default Nav;
