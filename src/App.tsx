import React from 'react';
import './App.sass';
import Nav from './components/Nav';
import AddItem from './components/AddItem';
import { GroceryItem, GroceryType } from './logic/GroceryItem';
import ItemList from './components/ItemList';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
// Firebase imports
import { auth, firestore } from './logic/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

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

//#region Test stuff
interface UserData {
  // TODO
  test: string;
}

// firestore.collection("cities").add(exampleItem1)
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });

// // Add a new document in collection "cities"
// firestore.collection("cities").doc("LA").set({
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// })
// .then(function() {
//   console.log("Document successfully written!");
// })
// .catch(function(error) {
//   alert(error);
// });

const TestThing = () => {
  const contentRef = firestore.collection('user');
  const query = contentRef.limit(3);

  const [content] = useCollectionData(query);

  return <div>{content && content.map((c) => <p>{(c as UserData).test}</p>)}</div>;
};
//#endregion

function App() {
  const [user, isLoading, error] = useAuthState(auth);
  const [activeListId, setActiveListId] = useState<null | string>(null);

  return (
    <>
      {user ? (
        <>
          <Nav activeListId={activeListId} setActiveListId={setActiveListId} />
          <section className="section">
            <AddItem />
            <ItemList items={items} />
          </section>
        </>
      ) : (
        <SignIn />
      )}
      <SignOut />
      {/* <TestThing /> */}
      <div className={`pageloader ${isLoading && 'is-active'}`}>
        {/* <span className="title">Logging in</span> */}
      </div>
    </>
  );
}

export default App;
