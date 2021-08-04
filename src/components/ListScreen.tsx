import { useParams } from 'react-router-dom';
import { firebase } from '../other/firebase';
import ItemList from './ItemList';
import Nav from './Nav';

export function ListScreen({ user }: { user: firebase.User }) {
  const { listId } = useParams<{ listId: string }>();

  return (
    <>
      <Nav activeListId={listId} user={user} />
      {listId && <ItemList user={user} activeListId={listId} />}
    </>
  );
}
