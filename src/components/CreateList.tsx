import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { firebase, firestore } from '../other/firebase';

interface FormValues {
  name: string;
}

interface Props {
  user: firebase.User;
}

const CreateList = ({ user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialValues: FormValues = { name: '' };

  function submit(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) {
    const newList = { name: values.name, owner: user.uid };
    // Create list
    firestore
      .collection('itemLists')
      .add(newList)
      .then((docRef) => {
        // TODO Maybe redirect to the new list
        // firestore.collection('users').doc(docRef.id).
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error(error);
        alert('Could not create new list :(');
      });
    // TODO Maybe I should add the ids to the user?
    setIsModalOpen(false);
  }

  function validate(values: FormValues) {
    let errors: FormikErrors<FormValues> = {};
    if (values.name === '') errors.name = 'Required';
    else {
      // TODO Probably check for duplicate names
    }
    return errors;
  }

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
              <Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
                {({ isSubmitting, values, errors, setFieldValue }) => {
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
                      <div className="field mt-5">
                        <div className="buttons">
                          <button
                            type="submit"
                            className="button is-primary"
                            disabled={isSubmitting}
                          >
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
