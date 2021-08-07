import React from 'react';
import { useState } from 'react';
import { firebase, firestore } from '../other/firebase';
import CreateList from './CreateList';
import { AccountInfo } from './AccountInfo';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import serverTypes from '../other/serverTypes';
import { NavLink } from 'react-router-dom';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  ListItemText,
  Box,
  ListItemIcon,
  LinearProgress,
  ListSubheader,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import { ErrorOutline, ArrowBack } from '@material-ui/icons';

// Style based on https://material-ui.com/components/app-bar/#bottom-app-bar
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  })
);

interface Props {
  activeListId: null | string;
  user: firebase.User;
}

const Nav: React.FC<Props> = ({ activeListId, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(activeListId === null);
  const classes = useStyles();

  const listListQuery = firestore.collection('itemLists').where('owner', '==', user.uid);
  const [lists, listsLoading, listsError] = useCollectionData<serverTypes.List>(listListQuery, {
    idField: 'id',
  });

  function TopBar() {
    return (
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Put list name here</Typography>
          <div className={classes.grow} />
          {/* <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    );
  }

  function ListsList() {
    return (
      <List>
        {lists ? (
          lists.length > 0 && (
            <>
              {lists.map((list) => (
                <ListItem
                  button
                  component={NavLink}
                  to={`/list/${list.id}`}
                  key={list.id}
                  onClick={() => setIsMenuOpen(false)}
                  activeClassName="Mui-selected"
                >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText>{list.name}</ListItemText>
                </ListItem>
              ))}

              <CreateList user={user} />
            </>
          )
        ) : listsLoading ? (
          <>
            <ListSubheader>Loading</ListSubheader>
            <LinearProgress />
          </>
        ) : (
          listsError && (
            <ListItem>
              <ListItemIcon>
                <ErrorOutline color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Could not load lists"
                secondary={listsError.message}
                primaryTypographyProps={{ color: 'error' }}
                secondaryTypographyProps={{ color: 'error' }}
              />
            </ListItem>
          )
        )}
      </List>
    );
  }

  return (
    <>
      <TopBar />
      <Toolbar />

      <Drawer anchor="left" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <Box>
          <IconButton
            edge="end"
            onClick={(event) => {
              setIsMenuOpen(false);
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>
        <Box px={2} pb={2}>
          <Typography variant="h4">DEFROST</Typography>
          <Typography variant="subtitle1">Bippedibappediboop</Typography>
        </Box>
        <Divider />
        <ListsList />
        <Divider />
        <AccountInfo user={user} />
      </Drawer>
    </>
  );
};

export default Nav;
