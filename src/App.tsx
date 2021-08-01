import React from 'react';
import './App.scss';
import SignIn from './components/SignIn';
import { auth, firebase } from './other/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ListScreen } from './components/ListScreen';
import Nav from './components/Nav';

function App() {
  // const [user, isLoading, error] = useAuthState(auth);
  const [user_, isLoading] = useAuthState(auth); // TODO Errors
  const user = user_ as firebase.User; // FIXME Why won't the types work for the hooks?

  return (
    <BrowserRouter>
      {user ? (
        <Switch>
          <Route path="/" exact>
            <Nav activeListId={null} user={user} />
          </Route>
          <Route path="/list/:listId">
            <ListScreen user={user} />
          </Route>
        </Switch>
      ) : isLoading ? (
        <div className="pageloader is-active"></div>
      ) : (
        <SignIn />
      )}
    </BrowserRouter>
  );
}

export default App;
