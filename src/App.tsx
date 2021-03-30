import React from 'react';
import './App.scss';
import Nav from './components/Nav';
import ItemList from './components/ItemList';
import SignIn from './components/SignIn';
import { auth } from './other/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import serverTypes from './other/serverTypes';

function App() {
  // const [user, isLoading, error] = useAuthState(auth);
  const [user, isLoading] = useAuthState(auth);
  const [activeList, setActiveList] = useState<null | serverTypes.List>(null);

  return (
    <>
      {user ? (
        <>
          <Nav activeList={activeList} setActiveList={setActiveList} user={user} />
          <section className="section">
            {activeList && <ItemList user={user} activeList={activeList} />}
          </section>
        </>
      ) : (
        <SignIn />
      )}
      <div className={`pageloader ${isLoading && 'is-active'}`}>
        {/* <span className="title">Logging in</span> */}
      </div>
    </>
  );
}

export default App;
