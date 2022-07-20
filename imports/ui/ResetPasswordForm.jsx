import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [messageSucess, setMessageSucess] = useState('');

  let navigate = useNavigate();

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const onClickConfirm = event => {
    event.preventDefault();

    console.log('ResetPasswordForm onClickConfirm');
    console.log(`email: ${email} `);

    if (email) {
      Accounts.forgotPassword({ email: email }, function (error) {
        // console.log(error);
        console.log('Email Sent. Check your mailbox.');
        setMessageSucess(`(Not Implementated) Email Sent. Check your mailbox.`);

        /*
        if (error) {
          if (error.message === 'User not found [403]') {
            console.log('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
        }
        */
      });
    }
  };

  const onClickCancelButton = event => {
    /* console.log('ResetPasswordForm onClickCancelButton'); */
    navigate('/');
  };

  return (
    <>
      <Box
        component="main"
        maxWidth="xs"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ mt: 15, ml: 25 }}
      >
        <Typography component="h1" variant="h5" align="center">
          Reset Password
        </Typography>
        {messageSucess ? (
          <Alert
            severity="success"
            onClose={() => {
              setMessageSucess('');
            }}
            sx={{ mb: 4 }}
          >
            {messageSucess}
          </Alert>
        ) : (
          ''
        )}

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '400px' },
          }}
          maxWidth="xs"
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-basic-email"
            label="e-mail"
            variant="outlined"
            value={email}
            onChange={handleChangeEmail}
          />
        </Box>
        <Box
          className="user-buttons"
          maxWidth="xs"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            type="button"
            variant="contained"
            onClick={onClickCancelButton}
          >
            Cancel
          </Button>
          <Button type="button" variant="contained" onClick={onClickConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  );
}
