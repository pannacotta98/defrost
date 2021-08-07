import React from 'react';
import { SignIn } from './components/SignIn';
import { auth, firebase } from './other/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ListScreen } from './components/ListScreen';
import Nav from './components/Nav';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { FullScreenLoader } from './components/FullScreenLoader';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  // const [user, isLoading, error] = useAuthState(auth);
  const [user_, isLoading] = useAuthState(auth); // TODO Errors
  const user = user_ as firebase.User; // FIXME Why won't the types work for the hooks?

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FullScreenLoader open={isLoading} colorful />
          {user ? (
            <Switch>
              <Route path="/" exact>
                <Nav activeListId={null} user={user} />
              </Route>
              <Route path="/list/:listId">
                <ListScreen user={user} />
              </Route>
            </Switch>
          ) : (
            <SignIn />
          )}
        </BrowserRouter>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
