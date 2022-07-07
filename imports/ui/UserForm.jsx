import React, { useState } from 'react';

import Header from './Header';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

const sexList = [
  {
    value: 'male',
    label: 'male',
  },
  {
    value: 'female',
    label: 'female',
  },
];

export default function UserForm() {
  const [sex, setSex] = useState('');

  const handleChangeSex = event => {
    setSex(event.target.value);
  };

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" align="center">
          User Registration
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '396px' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-basic-name"
              label="Name"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
            />
            <TextField
              required
              id="outlined-basic-email"
              label="e-mail"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-basic-date"
              label="Birth date"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-select-sex"
              fullWidth
              select
              label="Sex"
              value={sex}
              onChange={handleChangeSex}
              helperText="Please select your sex"
            >
              {sexList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="outlined-basic-company"
              label="Company"
              variant="outlined"
              fullWidth
            />
            <div className="user-buttons">
              <Button type="submit" variant="contained">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
}
