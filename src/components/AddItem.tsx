import React from 'react';
import { GroceryType } from '../other/GroceryItem';
import { isValidDate } from '../other/util';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { firebase, auth, firestore } from '../other/firebase';
import serverTypes from '../other/serverTypes';
import { motion } from 'framer-motion';

interface FormValues {
  // TODO Fix
  name: string;
  expDate: string;
}

interface Props {
  list: serverTypes.List;
  setIsAddItemOpen: (isOpen: boolean) => void;
}

const AddItem: React.FC<Props> = ({ list, setIsAddItemOpen }) => {
  return (
    <Formik
      initialValues={{ name: '', expDate: '', type: GroceryType.UNSET }}
      validate={(values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};

        if (values.name === '') errors.name = 'Required';
        if (!isValidDate(values.expDate) && values.expDate !== '') errors.expDate = 'Invalid date';

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // setSubmitting(true);
        if (auth.currentUser) {
          const newItem: serverTypes.Item = {
            name: values.name,
            expiresBy:
              values.expDate !== ''
                ? firebase.firestore.Timestamp.fromDate(new Date(values.expDate))
                : null,
            type: values.type,
            added: firebase.firestore.Timestamp.now(),
            addedBy: auth.currentUser.uid,
          };

          console.log(newItem);

          firestore
            .collection('itemLists')
            .doc(list.id)
            .collection('items')
            .add(newItem)
            .then(function () {
              console.log('Document successfully written!');
              setIsAddItemOpen(false);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert('Well, this should should not happen... Could not add the item :(');
        }
      }}
    >
      {({ isSubmitting, values, errors }) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="modal is-active"
        >
          <div className="modal-background"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="modal-content"
          >
            <Form className="box">
              <h1 className="title">New item</h1>
              <div className="field">
                <label className="label">Item</label>
                <div className="control">
                  <Field
                    className={`input ${errors.name && 'is-danger'}`}
                    type="text"
                    name="name"
                    placeholder="Suspicious meat"
                  />
                </div>
                <ErrorMessage className="help is-danger" name="name" component="div" />
              </div>

              {/* TODO Make none an option */}
              <div className="field">
                <label className="label">
                  Expiration date{' '}
                  <span className="has-text-grey has-text-weight-normal">
                    (leave blank if none)
                  </span>
                </label>
                <div className="control">
                  <Field
                    className={`input ${errors.expDate && 'is-danger'}`}
                    type="text"
                    name="expDate"
                    pattern="[0-9\-]*"
                    inputMode="numeric"
                    placeholder="yyyy-mm-dd"
                  />
                </div>
                <ErrorMessage className="help is-danger" name="expDate" component="div" />
              </div>

              <div className="field">
                <label className="label">Type</label>
                <div className="control">
                  <div className="buttons" role="group" aria-labelledby="my-radio-group">
                    {Object.values(GroceryType).map((value) => (
                      <label
                        key={value}
                        className={`button ${value === values.type ? 'is-primary' : ''}`}
                      >
                        <Field className="is-hidden" type="radio" name="type" value={value} />
                        {value}
                      </label>
                    ))}
                    {/* <div>Picked: {values.type}</div> */}
                  </div>
                </div>
              </div>

              <div className="field mt-6">
                <div className="control">
                  <button
                    type="submit"
                    className={`button is-primary is-medium is-fullwidth ${
                      isSubmitting && 'is-loading'
                    }`}
                    disabled={isSubmitting}
                  >
                    Add item
                  </button>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    type="button"
                    onClick={() => setIsAddItemOpen(false)}
                    className="button is-primary is-light is-medium is-fullwidth"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </Formik>
  );
};

export default AddItem;
