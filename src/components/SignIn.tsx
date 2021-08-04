import React from 'react';
import { firebase, auth, firestore } from '../other/firebase';
import { Typography, Box, Button, createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoText: {
      color: 'white',
    },
    subTitle: {
      color: 'white',
      opacity: '80%',
    },
    signInButton: {
      color: 'white',
      borderColor: 'white',
    },
  })
);

const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // result.additionalUserInfo?.isNewUser
      if (result.user) {
        const uid = result.user.uid;
        const userDataRef = firestore.collection('users').doc(uid);
        userDataRef
          .set(
            {
              // TODO Apparently these can be null!? But when/how?
              email: result.user.email,
              name: result.user.displayName,
              photoUrl: result.user.photoURL,
              uid: uid,
            },
            { merge: true }
          )
          .catch((error) => {
            alert('An error occured when setting user — ' + error.message);
            console.error(error);
            auth.signOut();
          });
      }
    })
    .catch((error) => {
      alert('An error occured during sign in — ' + error.message);
    });
};

export function SignIn() {
  const classes = useStyles();

  return (
    <Box height="100vh" bgcolor="secondary.main" py={20}>
      <Typography align="center" variant="h2" className={classes.logoText}>
        DEFROST
      </Typography>
      <Typography align="center" variant="h5" className={classes.subTitle}>
        Keep track of your food
      </Typography>
      <Box textAlign="center" position="fixed" bottom={100} left={0} right={0}>
        {/* TODO Add google icon when it is available in material ui icons */}
        <Button variant="outlined" onClick={googleSignIn} className={classes.signInButton}>
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
}
