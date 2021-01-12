import React from 'react';
import { useState } from 'react';
import { firebase, auth } from '../logic/firebase';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignIn = () => {
  const [loginInProgress, setLoginInProgress] = useState(false);

  const googleSignIn = () => {
    setLoginInProgress(true); // TODO Handle fails?
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="columns mt-6 is-vcentered">
      <div className="column">
        <h1 className="subtitle is-3 has-text-centered">Log in to continue</h1>
        <div className="has-text-centered mt-6">
          <button
            className={`button is-primary is-medium ${loginInProgress && 'is-loading'}`}
            onClick={googleSignIn}
          >
            <FontAwesomeIcon icon={faGoogle} />
            &nbsp;&nbsp;Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
