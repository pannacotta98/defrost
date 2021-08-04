import { IconButton } from '@material-ui/core';
import { auth } from '../other/firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const SignOut = () =>
  auth.currentUser && (
    <IconButton edge="end" onClick={() => auth.signOut()}>
      <ExitToAppIcon />
    </IconButton>
  );

export default SignOut;
