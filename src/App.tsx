import React from 'react';
import { SignIn } from './components/SignIn';
import { auth } from './other/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ListScreen } from './components/ListScreen';
import Nav from './components/Nav';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { FullScreenLoader } from './components/FullScreenLoader';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  // const [user, isLoading, error] = useAuthState(auth);
  const [user, isLoading] = useAuthState(auth);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
