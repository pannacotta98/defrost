import React from 'react';
import './App.sass';
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
            {/* <AddItem /> */}
            {activeList && <ItemList activeList={activeList} />}
            {/* <ItemList items={[]} /> */}
          </section>
        </>
      ) : (
        <SignIn />
      )}
      {/* <TestThing /> */}
      <div className={`pageloader ${isLoading && 'is-active'}`}>
        {/* <span className="title">Logging in</span> */}
      </div>
    </>
  );
}

export default App;
