import serverTypes from '../other/serverTypes';
import { firebase } from '../other/firebase';
import SignOut from './SignOut';

export const AccountInfo: React.FC<{ user: firebase.User }> = ({ user }) => (
  <div className="navbar-item">
    <span className="account-info">
      {user.photoURL && (
        <figure className="image is-32x32">
          <img className="is-rounded" src={user.photoURL} alt="Logged in user" />
        </figure>
      )}
      <span>{user.displayName}</span>
      <SignOut />
    </span>
  </div>
);
