import {
  Avatar,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { firebase } from '../other/firebase';
import SignOut from './SignOut';

export function AccountInfo({ user }: { user: firebase.User }) {
  return (
    <List>
      <ListItem>
        {user.photoURL && (
          <ListItemAvatar>
            <Avatar alt="Logged in user" src={user.photoURL} />
          </ListItemAvatar>
        )}
        <ListItemText primary={user.displayName} secondary={user.email} />
        <ListItemSecondaryAction>
          <SignOut />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
