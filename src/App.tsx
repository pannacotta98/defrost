import React from 'react';
import './App.sass';
import Nav from './components/Nav';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import { GroceryItem, GroceryType } from './logic/GroceryItem';
import { dayDiff } from './logic/util';
import ItemList from './components/ItemList';

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

function App() {
  // const a = new Date('2017-01-01'),
  //   b = new Date('2017-07-25'),
  //   difference = dayDiff(b, a);
  // alert(difference);

  return (
    <>
      <Nav />
      <AddItem />
      <ItemList items={items} />
    </>
  );
}

export default App;
