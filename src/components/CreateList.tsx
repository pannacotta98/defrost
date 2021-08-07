import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Box,
  Typography,
  Button,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Formik, FormikErrors, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { firebase, firestore } from '../other/firebase';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
    },
  })
);

interface FormValues {
  name: string;
}

interface Props {
  user: firebase.User;
}

const CreateList = ({ user }: Props) => {
  const classes = useStyles();
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
      <ListItem button onClick={() => setIsModalOpen(true)}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText>New list</ListItemText>
      </ListItem>

      <Drawer open={isModalOpen} anchor="bottom" onClose={() => setIsModalOpen(false)}>
        <Box px={2} pt={4} pb={4}>
          <Typography gutterBottom variant="h4">
            Create list
          </Typography>
          <Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
            {({ isSubmitting, values, errors, handleChange, touched, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  size="medium"
                  fullWidth
                  id="name"
                  name="name"
                  margin="normal"
                  label="List name"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.button}
                >
                  Create list
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => setIsModalOpen(false)}
                  className={classes.button}
                >
                  Cancel
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Drawer>
    </>
  );
};

export default CreateList;
