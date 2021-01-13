import React from 'react';
import { useState } from 'react';
import { GroceryItem, GroceryType } from '../logic/GroceryItem';
import { isValidDate } from '../logic/util';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { auth } from '../logic/firebase';
import { updateThrow } from 'typescript';

interface FormValues {
  name: string;
  expDate: string;
}

export default function AddItem() {
  // const [category, setCategory] = useState(GroceryType.UNSET);
  // const [dateString, setDateString] = useState('');

  // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (isValidDate(event.target.value)) {
  //     setDateString(event.target.value);
  //   } else {
  //     setDateString('invalid');
  //   }
  // };

  return (
    <Formik
      initialValues={{ name: '', expDate: '', type: GroceryType.UNSET }}
      validate={(values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};

        if (values.name === '') errors.name = 'Required';
        if (!isValidDate(values.expDate)) errors.expDate = 'Invalid date';

        // if (!values.email) {
        //   errors.email = 'Required';
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //   errors.email = 'Invalid email address';
        // }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (auth.currentUser) {
          const newItem: GroceryItem = {
            name: values.name,
            expiresBy: values.expDate !== '' ? new Date(values.expDate) : undefined,
            type: values.type,
            added: new Date(),
            addedBy: auth.currentUser?.uid,
          };

          console.log(newItem);
        }
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="container">
          <h1 className="title">New item</h1>
          <div className="field">
            <label className="label">Item</label>
            <div className="control">
              <Field className="input" type="text" name="name" placeholder="Suspicious meat" />
            </div>
            <ErrorMessage className="help is-danger" name="name" component="div" />
          </div>

          {/* TODO Make none an option */}
          <div className="field">
            <label className="label">
              Expiration date{' '}
              <span className="has-text-grey has-text-weight-normal">(leave blank if none)</span>
            </label>
            <div className="control">
              <Field
                className={`input`}
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
                className="button is-primary is-medium is-fullwidth"
                disabled={isSubmitting}
              >
                Add item
              </button>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="button" className="button is-primary is-light is-medium is-fullwidth">
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
