import * as functions from 'firebase-functions';
import { createInvite, acceptInvite } from './invites';

export { createInvite, acceptInvite };

export const testCallableFunction = functions.https.onCall(async (idk, context) => {
  return { test1: 'hej', test2: 'hej2', mail: context.auth?.token.email };
});
