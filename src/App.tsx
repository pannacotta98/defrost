import React from 'react';
import logo from './logo.svg';
import './App.sass';
import Nav from './components/Nav';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

function App() {
  return (
    <>
      <Nav />
      <AddItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </>
  );
}

export default App;
