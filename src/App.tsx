import React from 'react';
import './App.sass';
import Nav from './components/Nav';
import AddItem from './components/AddItem';
import { GroceryItem, GroceryType } from './other/GroceryItem';
import ItemList from './components/ItemList';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
// Firebase imports
import { auth } from './other/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import serverTypes from './other/serverTypes';

//#region
const exampleItem1: GroceryItem = {
  name: 'Example grocery item 1',
  added: new Date(),
  expiresBy: new Date('2021-01-01'),
  type: GroceryType.MEAT,
  addedBy: 'öööhh',
};

const exampleItem2: GroceryItem = {
  name: 'Example grocery item 2',
  added: new Date(),
  expiresBy: new Date('2021-01-11'),
  type: GroceryType.MEAT,
  addedBy: 'öööhh',
};

const exampleItem3: GroceryItem = {
  name: 'Example grocery item 3',
  added: new Date(),
  expiresBy: new Date('2021-01-12'),
  type: GroceryType.BREAD,
  addedBy: 'öööhh',
};

const exampleItem4: GroceryItem = {
  name: 'Example grocery item 4',
  added: new Date(),
  expiresBy: new Date('2021-07-12'),
  type: GroceryType.UNSET,
  addedBy: 'öööhh',
};

const items = [exampleItem1, exampleItem2, exampleItem3, exampleItem4];
//#endregion

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
            <ItemList items={items} />
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
