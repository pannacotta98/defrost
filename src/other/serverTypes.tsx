import { firebase } from './firebase';
import { GroceryType } from './GroceryItem';

declare namespace serverTypes {
  interface User {
    email: string;
    name: string;
    photoUrl: string;
    uid: string;
  }

  interface Item {
    name: string;
    expiresBy: firebase.firestore.Timestamp | null;
    added: firebase.firestore.Timestamp;
    type: GroceryType;
    addedBy: string;
    id?: string;
    // TODO Ev var frysen
  }

  interface List {
    name: string;
    owner: string;
    sharedWith: string[];
    id: string;
    // There is also a subcollection of Item in firestore
  }
}

export default serverTypes;
