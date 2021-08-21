import * as functions from 'firebase-functions';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { inspect } from 'util';

// https://youtu.be/Dk3VvRSrQIY

const PROJECT_ID = process.env.GCLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const billing = google.cloudbilling('v1').projects;

export const capBilling = functions.pubsub.topic('billing').onPublish(async (message) => {
  const data = message.json;
  console.log('Recieved pubsub notification');
  console.log(data);

  // NOTE The cap is at five times the budget
  if (data.costAmount <= data.budgetAmount * 5) {
    console.log(`No action necessary. (Current cost: ${data.costAmount} ${data.currencyCode})`);
    return `No action necessary. (Current cost: ${data.costAmount})`;
  }

  await disableBillingForReal();

  return null;
});

/**
 * @return {Promise} Credentials set globally
 */
const _setAuthCredential = () => {
  const client = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/cloud-billing',
      'https://www.googleapis.com/auth/cloud-platform',
    ],
  });

  // Set credentials
  google.options({
    auth: client,
  });
};

async function disableBillingForReal() {
  _setAuthCredential();
  if (PROJECT_NAME) {
    const billingInfo = await billing.getBillingInfo({ name: PROJECT_NAME });
    if (billingInfo.data.billingEnabled) {
      const result = await billing.updateBillingInfo({
        name: PROJECT_NAME,
        requestBody: { billingAccountName: '' },
      });
      console.log('Hopefully disabled billing', inspect(result));
    } else {
      console.log('Billing is already disabled');
    }
  }
}
