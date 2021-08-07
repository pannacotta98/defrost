import React from 'react';
import serverTypes from '../other/serverTypes';
import { firestore } from '../other/firebase';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { ExpDateText } from './ExpDateText';

interface Props {
  listId: string;
  item: serverTypes.Item;
  onPress: (item: serverTypes.Item) => void;
}

export function FoodListItem({ item, onPress, listId }: Props) {
  const removeItem = () => {
    firestore
      .collection('itemLists')
      .doc(listId)
      .collection('items')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('Removed item', item);
        // TODO Code below to use for undo functionality maybe
        // const idStrippedItem = _.cloneDeep(item);
        // delete idStrippedItem.id;
        // firestore
        //   .collection('itemLists')
        //   .doc(list.id)
        //   .collection('items')
        //   .add(idStrippedItem);
      })
      .catch((error) => alert(`Could not delete item — ${error.message}`));
  };

  return (
    <ListItem button onClick={() => onPress(item)}>
      <ListItemText
        primary={item.name}
        secondary={<ExpDateText variant="body2" expDate={item.expiresBy} />}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={(event) => {
            event.stopPropagation();
            if (window.confirm(`Are you sure you want to remove “${item.name}”?`)) {
              removeItem();
            }
          }}
        >
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
