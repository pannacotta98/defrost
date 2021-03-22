import React from 'react';
import { useState } from 'react';
import { firebase, firestore } from '../other/firebase';
import CreateList from './CreateList';
import SignOut from './SignOut';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import serverTypes from '../other/serverTypes';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  activeList: null | serverTypes.List;
  setActiveList: (listId: serverTypes.List) => void;
  user: firebase.User;
}

const Nav: React.FC<Props> = ({ activeList, setActiveList, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const listListQuery = firestore.collection('itemLists').where('owner', '==', user.uid);
  const [lists, listsLoading, listsError] = useCollectionData<serverTypes.List>(listListQuery, {
    idField: 'id',
  });

  const ListsList = () => (
    <div className="navbar-item has-dropdown is-hoverable">
      <div className="navbar-link">Selected list</div>
      <div className="navbar-dropdown">
        {lists ? (
          lists.length > 0 &&
          lists.map((list) => (
            <div
              key={list.id}
              onClick={() => {
                setActiveList(list);
                setIsMenuOpen(false);
              }}
              className={`navbar-item ${
                !(activeList && activeList.name === list.name)
                  ? 'has-text-grey'
                  : 'has-background-primary-light'
              }`}
            >
              {list.name}
            </div>
          ))
        ) : listsLoading ? (
          <div className="navbar-item">Loading...</div>
        ) : (
          listsError && (
            <div className="navbar-item">
              <p className="has-text-weight-bold has-text-danger">An error occured</p>
              <p className="has-text-danger">{listsError.message}</p>
            </div>
          )
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
    <div className="navbar-item">
      <div className="navbar-link">
        {user.photoURL && (
          <figure className="image">
            <img className="is-rounded" src={user.photoURL} alt="Logged in user" />
          </figure>
        )}
        {user.displayName}
      </div>
      <div className="buttons">
        <SignOut />
      </div>
    </div>
  );

  return (
    <>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="is-size-4 has-text-weight-bold navbar-item">
            Freezer{activeList && ' — ' + activeList.name}
          </span>
          <NavBurger />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="navbar-menu is-active"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="navbar-start">
                  <ListsList />
                </div>

                <hr className="" />
                <div className="navbar-end">
                  <AccountInfo />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Nav;
