import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/messaging';
import { firebaseConfig, vapidPushKey } from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const messaging = firebase.messaging();

messaging
  .getToken({
    vapidKey: vapidPushKey,
  })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log('Token: ', currentToken);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving messaging token. ', err);
    // ...
  });

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

// // DEBUG bipediboop
// firebase.functions().useEmulator('localhost', 5001);

export { firebase, auth, firestore };

// Cloud functions
export const createInvite = firebase.functions().httpsCallable('createInvite');
export const acceptInvite = firebase.functions().httpsCallable('acceptInvite');
