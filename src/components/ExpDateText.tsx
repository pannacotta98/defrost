import { dayDiff } from '../other/util';
import { firebase } from '../other/firebase';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { ErrorOutline, ReportProblemOutlined } from '@material-ui/icons';
import { Variant } from '@material-ui/core/styles/createTypography';

// How many days before expiration date to have warning color
const WARNING_THRES = 7;

const useStyles = makeStyles((theme) =>
  createStyles({
    inlineIconFix: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    warningText: {
      color: theme.palette.warning.dark,
    },
  })
);

export function ExpDateText({
  expDate,
  variant,
}: {
  expDate: firebase.firestore.Timestamp | null;
  variant: 'inherit' | Variant | undefined;
}) {
  const classes = useStyles();

  if (expDate === null) {
    return (
      <Typography component="span" variant={variant}>
        No expiration date
      </Typography>
    );
  }

  const expiresInDays = dayDiff(new Date(), expDate.toDate());

  if (expiresInDays === 0) {
    return (
      <Typography component="span" variant={variant}>
        Expires today!
      </Typography>
    );
  } else if (expiresInDays < 0) {
    return (
      <Typography
        component="span"
        color="error"
        variant={variant}
        className={classes.inlineIconFix}
      >
        <ErrorOutline fontSize="inherit" />
        &nbsp;Expired {-expiresInDays} days ago
      </Typography>
    );
  } else if (expiresInDays < WARNING_THRES) {
    return (
      <Typography
        component="span"
        variant={variant}
        className={[classes.inlineIconFix, classes.warningText].join(' ')}
      >
        <ReportProblemOutlined fontSize="inherit" />
        &nbsp;Expires in {expiresInDays} days
      </Typography>
    );
  } else {
    return (
      <Typography component="span" variant={variant}>
        Expires in {expiresInDays} days
      </Typography>
    );
  }
}
