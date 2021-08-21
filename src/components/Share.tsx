import { useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from '@material-ui/core';
import serverTypes from '../../shared/serverTypes';
import { useCollectionDataOnce, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { createInvite, firestore } from '../other/firebase';
import firebase from 'firebase';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ShareIcon from '@material-ui/icons/Share';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { FullScreenLoader } from './FullScreenLoader';

interface Props {
  list: serverTypes.List;
  user: firebase.User;
}

export function Share({ list, user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton edge="end" color="inherit" onClick={() => setIsOpen(true)}>
        <ShareIcon />
      </IconButton>

      <Drawer open={isOpen} anchor="bottom" onClose={() => setIsOpen(false)}>
        {list && <ShareList user={user} list={list} setIsOpen={setIsOpen} />}
      </Drawer>
    </>
  );
}

interface ShareListProps {
  user: firebase.User;
  list: serverTypes.List;
  setIsOpen: (open: boolean) => void;
}

function ShareList({ list, setIsOpen, user }: ShareListProps) {
  const [newInviteLink, setNewInviteLink] = useState<string | null>(null);
  const [inviteIsLoading, setInviteIsLoading] = useState(false);
  const inviteLinkFieldRef = useRef<HTMLInputElement>(null);

  // TOOD Eliminate these queries with denormalized data
  const sharedWithQuery = firestore
    .collection('users')
    .where(firebase.firestore.FieldPath.documentId(), 'in', list.sharedWith);
  const [sharedWith, sharedWithIsLoading, sharedWithError] =
    useCollectionDataOnce<serverTypes.User>(sharedWithQuery);
  const ownerQuery = firestore.collection('users').doc(list.owner);
  const [owner, ownerIsLoading, ownerError] = useDocumentDataOnce<serverTypes.User>(ownerQuery);

  return (
    <Box px={2} pt={4} pb={4}>
      <Typography gutterBottom variant="h4">
        Shared with
      </Typography>

      <Box mx={-2} mb={2}>
        <List>
          <ListSubheader>Owner</ListSubheader>
          {ownerIsLoading && <LinearProgress />}

          {owner && (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={owner.photoUrl} alt={owner.name} />
              </ListItemAvatar>
              <ListItemText primary={owner.name} secondary={owner.email} />
            </ListItem>
          )}
          {ownerError && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {/* TODO Fix error color here */}
                  <ErrorOutlineIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="An error occured" secondary={ownerError.message} />
            </ListItem>
          )}

          <ListSubheader>Shared with</ListSubheader>

          {sharedWithIsLoading && <LinearProgress />}

          {sharedWithError && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {/* TODO Fix error color here */}
                  <ErrorOutlineIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="An error occured" secondary={sharedWithError.message} />
            </ListItem>
          )}

          {/* TODO Refactor to share code with AccountInfo maybe */}

          {sharedWith &&
            sharedWith.map((user) => (
              <ListItem key={user.uid}>
                <ListItemAvatar>
                  <Avatar src={user.photoUrl} alt={user.name} />
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email} />
                {/* <ListItemSecondaryAction>
              <IconButton>
                <RemoveCircleOutline color="error" />
              </IconButton>
            </ListItemSecondaryAction> */}
              </ListItem>
            ))}

          {user.uid === list.owner ? (
            <ListItem
              button
              onClick={() => {
                setInviteIsLoading(true);
                createInvite({ listId: list.id })
                  .then((s) => {
                    setNewInviteLink(s.data);
                    setInviteIsLoading(false);
                  })
                  .catch((err) => {
                    console.error(err.message);
                    alert('Something went wrong with the invite');
                    setInviteIsLoading(false);
                  });
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonAddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Create new invite"
                secondary="generates a one-time link that can be shared"
              />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonAddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="" secondary="Only the owner of the list can add persons" />
            </ListItem>
          )}
        </List>
      </Box>

      <Button
        type="button"
        fullWidth
        variant="outlined"
        size="large"
        onClick={() => setIsOpen(false)}
      >
        Close
      </Button>

      <FullScreenLoader open={inviteIsLoading} />

      <Dialog open={newInviteLink !== null} onClose={() => setNewInviteLink(null)}>
        <DialogTitle>Here’s your invite link</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>The link has been copied to your clipboard</DialogContentText> */}
          <Box mb={1}>
            <TextField
              inputRef={inviteLinkFieldRef}
              fullWidth
              autoFocus
              variant="outlined"
              defaultValue={newInviteLink}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (inviteLinkFieldRef) {
                          inviteLinkFieldRef.current?.select();
                          document.execCommand('copy');
                        }
                      }}
                    >
                      <FileCopyOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <DialogContentText>
            Note that this invite can only be used once, and is time-limited
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setNewInviteLink(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
