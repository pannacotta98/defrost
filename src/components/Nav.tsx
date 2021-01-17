import React from 'react';
import { useState } from 'react';
import { firebase, auth, firestore } from '../logic/firebase';
import CreateList from './CreateList';
import SignOut from './SignOut';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import serverTypes from '../logic/serverTypes';

interface Props {
  activeListId: null | string;
  setActiveListId: (listId: string) => void;
  user: firebase.User;
}

const Nav: React.FC<Props> = ({ activeListId, setActiveListId, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const listListQuery = firestore.collection('itemLists').where('owner', '==', user.uid);
  const [lists, listsLoading, listsError] = useCollectionData<serverTypes.List>(listListQuery);

  const ListsList = () => (
    <div className="navbar-item has-dropdown is-hoverable">
      <div className="navbar-link">Selected list</div>

      <div className="navbar-dropdown">
        {lists ? (
          lists.length > 0 && lists.map((list) => <div className="navbar-item">{list.name}</div>)
        ) : listsLoading ? (
          <div className="navbar-item">Loading...</div>
        ) : (
          listsError && <div className="navbar-item">{listsError}</div>
        )}

        <hr className="navbar-divider" />

        <CreateList user={user} />
      </div>
    </div>
  );

  const NavBurger = () => (
    <div
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
    </div>
  );

  const AccountInfo = () => (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="navbar-link">
          {user.photoURL && (
            <figure className="image">
              <img className="is-rounded" src={user.photoURL} alt="Logged in user" />
            </figure>
          )}
          {auth.currentUser?.displayName}
        </div>
        <div className="buttons">
          <SignOut />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1 className="has-text-weight-bold navbar-item">Freezer</h1>
          <NavBurger />
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <ListsList />
          </div>

          <hr className="" />

          <AccountInfo />
        </div>
      </nav>
    </>
  );
};

export default Nav;
