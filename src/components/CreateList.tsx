import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { auth } from '../logic/firebase';

interface FormValues {
  // TODO Fix
  name: string;
  sharedWith: string[];
  addShare: string;
}

interface Props {}

const CreateList = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: FormValues = { name: '', sharedWith: [], addShare: '' };

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

                  if (values.addShare) {
                    // TODO should i validate
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  if (auth.currentUser) {
                    const newItem = {
                      name: values.name,
                    };

                    console.log(newItem);

                    // firestore
                    //   .collection('cities')
                    //   .doc('LA')
                    //   .set(newItem)
                    //   .then(function () {
                    //     console.log('Document successfully written!');
                    //   })
                    //   .catch(function (error) {
                    //     console.log(error);
                    //   });

                    setIsModalOpen(false);
                  } else {
                    alert('Well, this should should not happen... Could not add the item :(');
                  }
                }}
              >
                {({ isSubmitting, values, errors }) => (
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

                    {/* TODO Fix parameters and things */}
                    <div className="field is-grouped-multiline">
                      <label className="label">Shared with</label>

                      <div className="field">
                        <p className="control">
                          <button className="button is-danger is-outlined">mail@mail.se</button>
                        </p>
                      </div>

                      <div className="field has-addons">
                        <div className="control is-expanded">
                          <Field
                            className="input"
                            type="email"
                            name="addShare"
                            placeholder="mdfklsjdfkl"
                          />
                        </div>

                        {/* <p className="control">
                          <a className="button is-static">@gmail.com</a>
                        </p> */}

                        <div className="control">
                          <button type="button" className="button is-primary" disabled>
                            Share
                          </button>
                        </div>
                      </div>
                      {/* <ErrorMessage className="help is-danger" name="name" component="div" /> */}
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
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateList;
