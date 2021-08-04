import {
  AppBar,
  Avatar,
  Box,
  Container,
  createTheme,
  createStyles,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  makeStyles,
  Drawer,
  Button,
  ListItemIcon,
} from '@material-ui/core';
import { Add, ArrowBack, Check, RemoveCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export function SetListScreen() {
  const classes = useStyles();

  return (
    <Drawer open anchor="bottom">
      <Box px={2} pt={4}>
        <Typography gutterBottom variant="h4">
          Create list
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            size="medium"
            required
            fullWidth
            margin="normal"
            label="List name"
            variant="outlined"
          />
        </form>
      </Box>
      {/* <List>
        <ListSubheader>Shared with</ListSubheader>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Name thing" secondary="email@email.com" />
          <ListItemSecondaryAction>
            <RemoveCircleOutline />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Name thing" secondary="email@email.com" />
          <ListItemSecondaryAction>
            <RemoveCircleOutline />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Add user</ListItemText>
        </ListItem>
      </List> */}

      <Box p={2} pb={4}>
        <Button fullWidth size="large" color="primary" variant="contained" disableElevation>
          Create
        </Button>
        <Button fullWidth size="large">
          Cancel
        </Button>
      </Box>

      {/* <Fab color="primary" variant="extended" className={classes.fab}>
        Create list
      </Fab> */}
    </Drawer>
  );
}
