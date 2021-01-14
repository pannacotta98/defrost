import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';

interface FormValues {
  // TODO Fix
  name: string;
}

interface Props {}

const CreateList = (props: Props) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <Formik
            initialValues={{ name: '' }}
            validate={(values: FormValues) => {}}
            onSubmit={(values, { setSubmitting }) => {}}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <h1 className="title">New list</h1>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <Field className="input" type="text" name="name" placeholder="Kyyyyyylskåp" />
                  </div>
                  <ErrorMessage className="help is-danger" name="name" component="div" />
                </div>

                {/* TODO Fix parameters and things */}
                <div className="field">
                  <label className="label">Shared with</label>
                  <div className="field has-addons">
                    <div className="control">
                      <Field className="input" type="text" name="name" placeholder="Kyyyyyylskåp" />
                    </div>
                    <p className="control">
                      <a className="button is-static">@gmail.com</a>
                    </p>
                    <div className="control">
                      <a className="button is-primary">Share</a>
                    </div>
                    <ErrorMessage className="help is-danger" name="name" component="div" />
                  </div>
                </div>

                <div className="field mt-5">
                  {/* <hr /> */}
                  <div className="buttons">
                    <button className="button is-primary">HEJ</button>
                    <button className="button is-primary is-light">HEJ</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateList;
