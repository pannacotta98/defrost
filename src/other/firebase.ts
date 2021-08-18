import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();
const firestore = firebase.firestore();

// DEBUG bipediboop
console.log(firebase.functions);
firebase.functions().useEmulator('localhost', 5001);

export { firebase, auth, firestore };

// Cloud functions
export const testCallableFunction = firebase.functions().httpsCallable('testCallableFunction');
export const createInvite = firebase.functions().httpsCallable('createInvite');
export const acceptInvite = firebase.functions().httpsCallable('acceptInvite');
