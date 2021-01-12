import React from 'react';
import { useState } from 'react';
import './App.sass';
import Nav from './components/Nav';
import AddItem from './components/AddItem';
import { GroceryItem, GroceryType } from './logic/GroceryItem';
import ItemList from './components/ItemList';
// Firebase imports
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

//#region
const exampleItem1: GroceryItem = {
  name: 'Example grocery item 1',
  added: new Date(),
  expiresBy: new Date('2021-01-01'),
  type: [GroceryType.Meat, GroceryType.Fish],
};

const exampleItem2: GroceryItem = {
  name: 'Example grocery item 2',
  added: new Date(),
  expiresBy: new Date('2021-01-11'),
  type: [GroceryType.Meat],
};

const exampleItem3: GroceryItem = {
  name: 'Example grocery item 3',
  added: new Date(),
  expiresBy: new Date('2021-01-12'),
  type: [GroceryType.Bread],
};

const exampleItem4: GroceryItem = {
  name: 'Example grocery item 4',
  added: new Date(),
  expiresBy: new Date('2021-07-12'),
  type: [GroceryType.Fish],
};

const items = [exampleItem1, exampleItem2, exampleItem3, exampleItem4];
//#endregion

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();
const firestore = firebase.firestore();

const SignIn = () => {
  const [loginInProgress, setLoginInProgress] = useState(false);

  const googleSignIn = () => {
    setLoginInProgress(true); // TODO Handle fails?
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div className="columns mt-6 is-vcentered">
      <div className="column">
        <h1 className="subtitle is-3 has-text-centered">Log in to continue</h1>
        <div className="has-text-centered mt-6">
          <button
            className={`button is-primary ${loginInProgress && 'is-loading'}`}
            onClick={googleSignIn}
          >
            <FontAwesomeIcon icon={faGoogle} />
            &nbsp;&nbsp;Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

const SignOut = () => {
  return (
    auth.currentUser && (
      <button className="button is-danger" onClick={() => auth.signOut()}>
        Sign out
      </button>
    )
  );
};

interface UserData {
  // TODO
  test: string;
}

const TestThing = () => {
  const contentRef = firestore.collection('user');
  const query = contentRef.limit(3);

  const [content] = useCollectionData(query);

  return <div>{content && content.map((c) => <p>{(c as UserData).test}</p>)}</div>;
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Nav />
      <section className="section">
        {user ? (
          <>
            <AddItem />
            <ItemList items={items} />
          </>
        ) : (
          <SignIn />
        )}
        <SignOut />
        <TestThing />
      </section>
    </>
  );
}

export default App;
