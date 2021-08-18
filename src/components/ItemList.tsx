import React, { useState } from 'react';
import serverTypes from '../../shared/serverTypes';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebase, firestore } from '../other/firebase';
import SetItem from './SetItem';
import { sortingFunctions } from '../other/sortingFunctions';
import { Box, createStyles, Drawer, Fab, List, makeStyles, Typography } from '@material-ui/core';
import { Add, ErrorOutline } from '@material-ui/icons';
import { FoodListItem } from './ListItem';
import { FullScreenLoader } from './FullScreenLoader';

const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

interface Props {
  activeListId: string;
  user: firebase.User;
}

const ItemList: React.FC<Props> = ({ activeListId, user }) => {
  // The item currently open in modal, 'closed' if none, or 'new' if adding item
  const [itemModal, setItemModal] = useState<serverTypes.Item | 'new' | 'closed'>('closed');
  const classes = useStyles();

  const listQuery = firestore.collection('itemLists').doc(activeListId).collection('items');
  let [items, isLoading, error] = useCollectionData<serverTypes.Item>(listQuery, { idField: 'id' });
  if (!items) items = [];

  const filterCondition = () => true;
  const sortCondition = sortingFunctions.get('oldest first');

  const filteredAndSortedItems = items.filter(filterCondition).sort(sortCondition);

  return (
    <Box>
      <List>
        <FullScreenLoader open={isLoading} />
        {error ? (
          <Box py={6} px={2} textAlign="center">
            <ErrorOutline color="error" fontSize="large" />
            <Typography gutterBottom color="error" variant="h6">
              An error occured
            </Typography>
            <Typography color="error" variant="body2">
              {error.message}
            </Typography>
          </Box>
        ) : items.length < 1 ? (
          <Box py={6} px={2}>
            <Typography variant="body1" align="center">
              The list is empty
            </Typography>
          </Box>
        ) : filteredAndSortedItems.length < 1 ? (
          <Box py={6} px={2}>
            <Typography variant="body1" align="center">
              No item matches the current filter
            </Typography>
          </Box>
        ) : (
          filteredAndSortedItems.map((item, idx) => (
            <FoodListItem listId={activeListId} item={item} key={idx} onPress={setItemModal} /> // TODO Use id instead of index probably
          ))
        )}
      </List>

      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setItemModal('new')}
      >
        <Add />
      </Fab>

      <Drawer open={itemModal !== 'closed'} anchor="bottom">
        {itemModal !== 'closed' && (
          <SetItem
            listId={activeListId}
            closeModal={() => setItemModal('closed')}
            selectedItem={itemModal === 'new' ? null : itemModal}
            user={user}
          />
        )}
      </Drawer>
    </Box>
  );
};

export default ItemList;
