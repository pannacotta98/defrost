import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../other/firebase';

const SignOut = () => {
  return (
    auth.currentUser && (
      <button className="button is-danger is-light" onClick={() => auth.signOut()}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        &nbsp;&nbsp;Sign out
      </button>
    )
  );
};

export default SignOut;
