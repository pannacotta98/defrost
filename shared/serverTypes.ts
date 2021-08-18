import { firebase } from '../src/other/firebase';
import { GroceryType } from '../src/other/GroceryItem'; // FIXME move here?

/**
 * Types and type guards for types used in both frontend and backend
 */
namespace serverTypes {
  export interface User {
    email: string;
    name: string;
    photoUrl: string;
    uid: string;
  }

  export interface Item {
    name: string;
    expiresBy: firebase.firestore.Timestamp | null;
    added: firebase.firestore.Timestamp;
    type: GroceryType;
    addedBy: string;
    id?: string;
    // TODO Ev var frysen
  }

  export interface List {
    name: string;
    owner: string;
    sharedWith: string[];
    id: string;
    // There is also a subcollection of Item in firestore
  }

  export interface InviteCreationRequest {
    listId: string;
  }
  export function isInviteCreationRequest(obj: any): obj is InviteCreationRequest {
    return obj && typeof obj.listId === 'string';
  }

  export interface InviteAcceptRequest {
    inviteId: string;
  }
  export function isInviteAcceptRequest(obj: any): obj is InviteAcceptRequest {
    return obj && typeof obj.inviteId === 'string';
  }
}

export default serverTypes;
