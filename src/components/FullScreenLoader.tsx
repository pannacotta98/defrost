import { Backdrop, CircularProgress, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      zIndex: 20000,
    },
  })
);

export function FullScreenLoader({
  open,
  colorful = false,
}: {
  open: boolean;
  colorful?: boolean;
}) {
  const classes = useStyles();

  return (
    <Backdrop open={open} className={colorful ? classes.backdrop : ''}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
