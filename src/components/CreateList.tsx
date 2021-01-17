import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { firebase, firestore } from '../logic/firebase';
import serverTypes from './../logic/serverTypes';

interface FormValues {
  name: string;
  sharedWith: serverTypes.User[];
}

interface Props {
  user: firebase.User;
}

const CreateList = ({ user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: FormValues = { name: '', sharedWith: [] };

  return (
    <>
      <div className="navbar-item" onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
        &nbsp;&nbsp;Create new list
      </div>

      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <Formik
                initialValues={initialValues}
                validate={(values: FormValues) => {
                  let errors: FormikErrors<FormValues> = {};

                  if (values.name === '') errors.name = 'Required';
                  else {
                    // TODO Probably check for duplicate names
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const list = {
                    name: values.name,
                    owner: user.uid,
                    sharedWith: values.sharedWith.map((user) => user.uid),
                  };

                  // Create list
                  firestore
                    .collection('itemLists')
                    .add(list)
                    .then((docRef) => {
                      // firestore.collection('users').doc(docRef.id).
                      console.log('Document successfully written!');
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  // TODO Maybe I should add the ids to the user?

                  setIsModalOpen(false);
                }}
              >
                {({ isSubmitting, values, errors, setFieldValue }) => {
                  const sharedWithValue = values.sharedWith;
                  return (
                    <Form>
                      <h1 className="title">New list</h1>
                      <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                          <Field
                            className={`input ${errors.name && 'is-danger'}`}
                            type="text"
                            name="name"
                            placeholder="Kyyyyyylskåp"
                          />
                        </div>
                        <ErrorMessage className="help is-danger" name="name" component="div" />
                      </div>

                      <div className="field is-grouped-multiline">
                        <label className="label">Shared with</label>
                        {values.sharedWith.map((value) => (
                          <div className="field" key={value.uid}>
                            <p className="control">
                              <button type="button" className="button">
                                {value.email}
                              </button>
                            </p>
                          </div>
                        ))}

                        {/* Add share subform */}
                        <Formik
                          initialValues={{ email: '' }}
                          validateOnBlur={true}
                          validateOnChange={false}
                          validate={async (values) => {
                            const query = firestore
                              .collection('users')
                              .where('email', '==', values.email);

                            const snapshot = await query.get({
                              source: 'server',
                            });

                            if (!snapshot.empty) {
                              return snapshot.docs[0].data().uid === user.uid
                                ? { email: 'Well, that’s your own email...' }
                                : {}; // No errors if exist and is not the same as current user
                            }

                            return { email: 'No user with that email exist' };
                          }}
                          onSubmit={async (values, { setSubmitting }) => {
                            const snapshot = await firestore
                              .collection('users')
                              .where('email', '==', values.email)
                              .get();
                            setFieldValue(
                              'sharedWith',
                              sharedWithValue.concat(snapshot.docs[0].data() as serverTypes.User)
                            );
                          }}
                        >
                          {({ errors, submitForm }) => (
                            <div className="field has-addons">
                              <div className="control is-expanded">
                                <Field
                                  className="input"
                                  type="email"
                                  name="email"
                                  placeholder="mdfklsjdfkl"
                                />
                              </div>
                              <div className="control">
                                <button
                                  type="button"
                                  className="button is-primary"
                                  onClick={submitForm}
                                >
                                  Share
                                </button>
                              </div>
                              {/* TODO Fix position of error message */}
                              <ErrorMessage
                                className="help is-danger"
                                name="email"
                                component="div"
                              />
                            </div>
                          )}
                        </Formik>
                      </div>

                      <div className="field mt-5">
                        {/* <hr /> */}
                        <div className="buttons">
                          <button className="button is-primary" disabled={isSubmitting}>
                            Create
                          </button>
                          <button
                            type="button"
                            className="button is-primary is-light"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateList;
