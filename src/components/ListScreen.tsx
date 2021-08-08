import {
  useCollectionData,
  useDocumentDataOnce,
  useDocumentOnce,
} from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { firebase, firestore } from '../other/firebase';
import serverTypes from '../other/serverTypes';
import ItemList from './ItemList';
import Nav from './Nav';
import { ShareList } from './ShareList';

export function ListScreen({ user }: { user: firebase.User }) {
  const { listId } = useParams<{ listId: string }>();

  // I could probably save a few requests if I fetch the whole list list
  // once and somehow share this between here and the list in Nav
  const query = firestore.collection('itemLists').doc(listId);
  const [list, listLoading, listError] = useDocumentDataOnce<serverTypes.List>(query, {
    idField: 'id',
  });
  console.log(list);

  return (
    <>
      <Nav activeListId={listId} user={user} />
      {listId && <ItemList user={user} activeListId={listId} />}
      <ShareList />
    </>
  );
}
