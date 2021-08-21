import { Box, Button, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import serverTypes from '../../shared/serverTypes';
import { acceptInvite } from './../other/firebase';
import { FullScreenLoader } from './FullScreenLoader';

export function InviteAccept() {
  const { inviteId } = useParams<{ inviteId: string }>();
  const [inviteError, setInviteError] = useState<any>(null);
  const [listIdOfInvite, setListIdOfInvite] = useState<null | string>(null);

  useEffect(() => {
    const request: serverTypes.InviteAcceptRequest = { inviteId };
    acceptInvite(request)
      .then(({ data }) => {
        setListIdOfInvite(data);
      })
      .catch((error) => {
        setInviteError(error);
        console.log(error);
      });
  }, [inviteId]);

  if (inviteError !== null) {
    return (
      <Box height="100vh" bgcolor="warning.main" py={20} px={5}>
        <Typography gutterBottom align="center" variant="h4">
          Something went wrong
        </Typography>
        <Typography align="center" variant="body1">
          {inviteError.message ?? 'Unknown error'}
        </Typography>
        <Box textAlign="center" position="fixed" bottom={100} left={0} right={0}>
          <Button component={Link} to="/" variant="outlined">
            To home
          </Button>
        </Box>
      </Box>
    );
  } else if (listIdOfInvite) {
    return <Redirect to={`/list/${listIdOfInvite}`} />;
  } else {
    return <FullScreenLoader open colorful />;
  }
}
