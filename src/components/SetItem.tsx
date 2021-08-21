import React from 'react';
import { GroceryType } from '../other/GroceryItem';
import { Formik, FormikErrors, FormikHelpers } from 'formik';
import { firebase, firestore } from '../other/firebase';
import serverTypes from '../../shared/serverTypes';
import { Box, Button, createStyles, makeStyles, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { isValid } from 'date-fns';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    radioButton: {
      marginRight: theme.spacing(1.5),
      marginTop: theme.spacing(1.5),
    },
  })
);

interface FormValues {
  name: string;
  expDate: Date | null;
  type: GroceryType;
}

interface Props {
  user: firebase.User;
  listId: string;
  selectedItem: serverTypes.Item | null; // null if creating new item
  closeModal: () => void;
}

/** A component for creating or modifying items */
function SetItem({ listId, closeModal, selectedItem, user }: Props) {
  const classes = useStyles();

  function submit(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) {
    // setSubmitting(true);
    const newItem: serverTypes.Item = {
      name: values.name,
      expiresBy:
        values.expDate !== null ? firebase.firestore.Timestamp.fromDate(values.expDate) : null,
      type: values.type,
      added: firebase.firestore.Timestamp.now(),
      addedBy: user.uid,
    };

    const itemCollection = firestore.collection('itemLists').doc(listId).collection('items');

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
  }

  function validate(values: FormValues) {
    let errors: FormikErrors<FormValues> = {};

    if (values.name === '') errors.name = 'Required';
    if (values.expDate !== null && !isValid(values.expDate)) errors.expDate = 'Invalid date';

    return errors;
  }

  const initialFormValues =
    selectedItem === null
      ? { name: '', expDate: null, type: GroceryType.UNSET }
      : {
          name: selectedItem.name,
          expDate: selectedItem.expiresBy === null ? null : selectedItem.expiresBy.toDate(),
          type: selectedItem.type,
        };

  return (
    <Box px={2} pt={4} pb={4}>
      <Typography gutterBottom variant="h4">
        {selectedItem === null ? 'New item' : 'Update item'}
      </Typography>

      <Formik initialValues={initialFormValues} validate={validate} onSubmit={submit}>
        {({ isSubmitting, values, errors, handleSubmit, touched, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              size="medium"
              fullWidth
              id="name"
              name="name"
              margin="normal"
              label="Name of the item"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            <KeyboardDatePicker
              clearable
              fullWidth
              disableToolbar
              size="medium"
              inputVariant="outlined"
              format="yyyy-MM-dd"
              margin="normal"
              inputMode="numeric"
              label="Expiration date (yyyy-mm-dd, blank if none)"
              value={values.expDate}
              onChange={(value) => {
                setFieldValue('expDate', value);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              inputProps={{
                pattern: '[0-9-]*',
                inputMode: 'numeric',
              }}
            />

            {/* <Box py={1}>
                <Typography variant="subtitle2">Type</Typography>
                {Object.values(GroceryType).map((value) => (
                  <Button
                    size="large"
                    component="label"
                    disableElevation
                    color={value === values.type ? 'primary' : 'default'}
                    // variant={value === values.type ? 'contained' : 'outlined'}
                    variant="outlined"
                    key={value}
                    startIcon={
                      value === values.type ? <RadioButtonChecked /> : <RadioButtonUnchecked />
                    }
                    className={classes.radioButton}
                  >
                    <Field className={classes.hide} type="radio" name="type" value={value} />
                    {value}
                  </Button>
                ))}
              </Box> */}

            <Button // TODO Could some kind of loading indicator be used here?
              color="primary"
              variant="contained"
              size="large"
              disableElevation
              fullWidth
              type="submit"
              disabled={isSubmitting}
              className={classes.button}
            >
              {selectedItem === null ? 'Add item' : 'Update item'}
            </Button>

            <Button
              type="button"
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => closeModal()}
              className={classes.button}
            >
              Cancel
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default SetItem;
