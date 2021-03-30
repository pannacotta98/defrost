import React from 'react';
import { GroceryType } from '../other/GroceryItem';
import { isValidDate } from '../other/util';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { firebase, firestore } from '../other/firebase';
import serverTypes from '../other/serverTypes';
import { motion } from 'framer-motion';
import { dateToYMD } from './../other/util';

interface FormValues {
  // TODO Fix
  name: string;
  expDate: string;
  type: GroceryType;
}

interface Props {
  user: serverTypes.User;
  list: serverTypes.List;
  selectedItem: serverTypes.Item | null; // null if creating new item
  closeModal: () => void;
}

/** A modal for creating or modifying items */
const SetItem: React.FC<Props> = ({ list, closeModal, selectedItem, user }) => {
  return (
    <Formik
      initialValues={
        selectedItem === null
          ? { name: '', expDate: '', type: GroceryType.UNSET }
          : {
              name: selectedItem.name,
              expDate:
                selectedItem.expiresBy === null ? '' : dateToYMD(selectedItem.expiresBy.toDate()),
              type: selectedItem.type,
            }
      }
      validate={(values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};

        if (values.name === '') errors.name = 'Required';
        if (!isValidDate(values.expDate) && values.expDate !== '') errors.expDate = 'Invalid date';

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // setSubmitting(true);
        const newItem: serverTypes.Item = {
          name: values.name,
          expiresBy:
            values.expDate !== ''
              ? firebase.firestore.Timestamp.fromDate(new Date(values.expDate))
              : null,
          type: values.type,
          added: firebase.firestore.Timestamp.now(),
          addedBy: user.uid,
        };

        const itemCollection = firestore.collection('itemLists').doc(list.id).collection('items');

        if (selectedItem === null) {
          // Add new item
          itemCollection
            .add(newItem)
            .then(function () {
              closeModal();
            })
            .catch(function (error) {
              console.error('Could not add item', error);
              alert('Could not add item — ' + error.message);
              closeModal();
            });
        } else {
          if (selectedItem.id) {
            // Update existing item
            itemCollection
              .doc(selectedItem.id)
              .set(newItem)
              .then(function () {
                closeModal();
              })
              .catch(function (error) {
                console.error('Could not update item', error);
                alert('Could not update item — ' + error.message);
                closeModal();
              });
          } else {
            console.error('Could not update item — id prop missing');
            alert('An error occured when trying to update item :((');
            closeModal();
          }
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
              <h1 className="title">{selectedItem === null ? 'New item' : 'Update item'}</h1>
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
                    className={`button is-primary is-fullwidth ${isSubmitting && 'is-loading'}`}
                    disabled={isSubmitting}
                  >
                    {selectedItem === null ? 'Add item' : 'Update'}
                  </button>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    type="button"
                    onClick={() => closeModal()}
                    className="button is-primary is-light is-fullwidth"
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

export default SetItem;
