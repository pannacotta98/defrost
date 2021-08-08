import { PersonAdd, RemoveCircleOutline } from '@material-ui/icons';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Typography,
} from '@material-ui/core';

export function ShareList() {
  return (
    <Drawer open={true} anchor="bottom">
      <Box px={2} pt={4} pb={4}>
        <Typography gutterBottom variant="h4">
          Shared with
        </Typography>

        <Box mx={-2} mb={2}>
          <List>
            {/* <ListItem>
              <ListItemText>Exactly zero persons</ListItemText>
            </ListItem> */}

            <ListItem>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name thing" secondary="email" />
              <ListItemSecondaryAction>
                <IconButton>
                  <RemoveCircleOutline color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                {/* <Avatar> */}
                <CircularProgress variant="determinate" value={68} />
                {/* <PersonAdd /> */}
                {/* </Avatar> */}
              </ListItemAvatar>
              <ListItemText primary="Active invite link" secondary="expires in ??" />
              <ListItemSecondaryAction>
                <Button>Get link</Button>
                <IconButton>
                  <RemoveCircleOutline color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <PersonAdd />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Create new invite"
                secondary="generates a one-time link that can be shared"
              />
            </ListItem>
          </List>
        </Box>

        <Button
          type="button"
          fullWidth
          variant="outlined"
          size="large"
          // onClick={() => setIsModalOpen(false)}
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
  );
}
