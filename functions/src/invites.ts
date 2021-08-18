import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import serverTypes from './../../shared/serverTypes';

const INVITE_TIMEOUT_MINUTES = 15;

admin.initializeApp();

/** An invite as stored in `invites/` */
interface Invite {
  listId: string;
  expiresBy: admin.firestore.Timestamp;
}

/**
 *
 */
export const createInvite = functions.https.onCall(async (inviteCreationRequest, context) => {
  if (!serverTypes.isInviteCreationRequest(inviteCreationRequest)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function was called with invalid or missing arguments'
    );
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The action can only be performed when autheticated'
    );
  }

  const listSnapshot = await admin
    .firestore()
    .collection('itemLists')
    .doc(inviteCreationRequest.listId)
    .get();
  const listTheInviteShouldPointTo = listSnapshot.data() as serverTypes.List; // FIXME What if it doesnt exist?
  // TODO Try/catch osv?

  if (context.auth.uid !== listTheInviteShouldPointTo.owner) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'The action can only be performed when autheticated as the owner of the list'
    );
  }

  // TODO Maybe add some info to the list as well?
  // maybe batch with invite creation
  const invite: Invite = {
    listId: inviteCreationRequest.listId,
    expiresBy: addMinutesToTimestamp(admin.firestore.Timestamp.now(), INVITE_TIMEOUT_MINUTES),
  };
  const inviteRef = await admin.firestore().collection('invites').add(invite);

  const inviteId = inviteRef.id;

  // functions.logger.info('test!', { structuredData: true });
  return inviteId;

  // TODO Try/catch osv?
});

/**
 *
 */
export const acceptInvite = functions.https.onCall(async (inviteAcceptRequest, context) => {
  if (!serverTypes.isInviteAcceptRequest(inviteAcceptRequest)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function was called with invalid or missing arguments'
    );
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The action can only be performed when autheticated'
    );
  }

  const inviteSnapshot = await admin
    .firestore()
    .collection('invites')
    .doc(inviteAcceptRequest.inviteId)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError('permission-denied', 'Could not find invite');
    });

  if (!inviteSnapshot.data()) {
    throw new functions.https.HttpsError('permission-denied', 'Invite does not exist');
  }
  const invite = inviteSnapshot.data() as Invite;

  if (hasExpired(invite)) {
    // FIXME Somehow this wont really work
    throw new functions.https.HttpsError('permission-denied', 'The invite has expired');
  }

  const batch = admin.firestore().batch();
  const listRef = admin.firestore().collection('itemLists').doc(invite.listId);
  batch.update(listRef, { sharedWith: admin.firestore.FieldValue.arrayUnion(context.auth.uid) });
  batch.delete(inviteSnapshot.ref);
  await batch.commit().catch((err) => {
    functions.logger.info('Batch write failed', err);
    throw new functions.https.HttpsError('internal', 'An unknown error occured');
  });

  // TODO (Maybe add to denormalized list on user in future)

  return invite.listId;
});

// TODO What happens if the list is removed while invite in progress?

function hasExpired(invite: Invite) {
  return invite.expiresBy < admin.firestore.Timestamp.now();
}

const MS_PER_MINUTE = 60 * 1_000;
function addMinutesToTimestamp(time: admin.firestore.Timestamp, minutes: number) {
  return admin.firestore.Timestamp.fromMillis(time.toMillis() + minutes * MS_PER_MINUTE);
}
