import React from 'react';
import { firebase, auth, firestore } from '../other/firebase';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignIn = () => {
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // result.additionalUserInfo?.isNewUser
        if (result.user) {
          const uid = result.user.uid;
          const userDataRef = firestore.collection('users').doc(uid);
          userDataRef.set(
            {
              // TODO Apparently these can be null!? But when/how?
              email: result.user.email,
              name: result.user.displayName,
              photoUrl: result.user.photoURL,
              uid: uid,
            },
            { merge: true }
          );
        }
      })
      .catch((error) => {
        // // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        alert(errorMessage);
      });
  };

  return (
    <section className="hero is-primary is-fullheight is-medium">
      <div className="hero-head"></div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title has-text-weight-medium is-1 has-text-centered">
            Keep track of your food
          </h1>
          <h2 className="subtitle is-3 pt-5">Sign in to continue</h2>
        </div>
      </div>
      <div className="hero-foot has-text-centered mt-6">
        <button className={`button is-primary is-inverted is-medium mb-6`} onClick={googleSignIn}>
          <FontAwesomeIcon icon={faGoogle} />
          &nbsp;&nbsp;Sign in with Google
        </button>
      </div>
    </section>
  );
};

export default SignIn;
