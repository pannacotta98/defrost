import { PersonAdd, RemoveCircleOutline, Share } from '@material-ui/icons';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
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

interface Props {
  list: serverTypes.List;
}

export function ShareList({ list }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // TODO Refactor to avoid requests when the menu is not open
  const sharedWithQuery = firestore
    .collection('users')
    .where(firebase.firestore.FieldPath.documentId(), 'in', list.sharedWith);
  console.log(list.sharedWith);
  const [sharedWith, isLoading, error] = useCollectionDataOnce<serverTypes.User>(sharedWithQuery);

  console.log(sharedWith, isLoading, error);

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={() => setIsOpen(true)}>
        <Share />
      </IconButton>

      <Drawer open={isOpen} anchor="bottom" onClose={() => setIsOpen(false)}>
        <Box px={2} pt={4} pb={4}>
          <Typography gutterBottom variant="h4">
            Shared with
          </Typography>

          <Box mx={-2} mb={2}>
            <List>
              {/* <ListItem>
              <ListItemText>Exactly zero persons</ListItemText>
            </ListItem> */}

              {sharedWith &&
                sharedWith.map((user) => (
                  <ListItem>
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

          {/* <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          autoHideDuration={6000}
          // onClose={handleClose}
          message="Note archived"
          // action={
          //   <React.Fragment>
          //     <Button color="secondary" size="small" onClick={handleClose}>
          //       UNDO
          //     </Button>
          //     <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          //       <CloseIcon fontSize="small" />
          //     </IconButton>
          //   </React.Fragment>
          // }
        /> */}
        </Box>
      </Drawer>
    </>
  );
}
