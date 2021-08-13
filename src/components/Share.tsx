import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import serverTypes from '../other/serverTypes';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../other/firebase';
import firebase from 'firebase';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ShareIcon from '@material-ui/icons/Share';

interface Props {
  list: serverTypes.List;
}

export function Share({ list }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton edge="end" color="inherit" onClick={() => setIsOpen(true)}>
        <ShareIcon />
      </IconButton>

      <Drawer open={isOpen} anchor="bottom" onClose={() => setIsOpen(false)}>
        {list && <ShareList list={list} setIsOpen={setIsOpen} />}
      </Drawer>
    </>
  );
}

interface ShareListProps {
  list: serverTypes.List;
  setIsOpen: (open: boolean) => void;
}

function ShareList({ list, setIsOpen }: ShareListProps) {
  const sharedWithQuery = firestore
    .collection('users')
    .where(firebase.firestore.FieldPath.documentId(), 'in', list.sharedWith);
  const [sharedWith, isLoading, error] = useCollectionDataOnce<serverTypes.User>(sharedWithQuery);

  return (
    <Box px={2} pt={4} pb={4}>
      <Typography gutterBottom variant="h4">
        Shared with
      </Typography>

      <Box mx={-2} mb={2}>
        <List>
          {isLoading && <LinearProgress />}

          {error && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {/* TODO Fix error color here */}
                  <ErrorOutlineIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="An error occured" secondary={error.message} />
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

          {/* <ListItem>
        <ListItemAvatar>
          <CircularProgress variant="determinate" value={68} />
        </ListItemAvatar>
        <ListItemText primary="Active invite link" secondary="expires in ??" />
        <ListItemSecondaryAction>
          <Button>Get link</Button>
          <IconButton>
            <RemoveCircleOutline color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem> */}

          {/* <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <PersonAdd />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Create new invite"
          secondary="generates a one-time link that can be shared"
        />
      </ListItem> */}
        </List>
      </Box>

      <Button
        type="button"
        fullWidth
        variant="outlined"
        size="large"
        onClick={() => setIsOpen(false)}
        // className={classes.button}
      >
        Close
      </Button>
    </Box>
  );
}
