import { auth } from '../logic/firebase';

const SignOut = () => {
  return (
    auth.currentUser && (
      <button className="button is-danger" onClick={() => auth.signOut()}>
        Sign out
      </button>
    )
  );
};

export default SignOut;
