import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import Header from './Header';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconButton from '@mui/material/IconButton';

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
  // User's full name
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [company, setCompany] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [photouser, setPhotoUser] = useState('');

  let navigate = useNavigate();

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const handleChangeSex = event => {
    setSex(event.target.value);
  };

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleChangeBirthDate = newValue => {
    setBirthDate(newValue);
  };

  const handleChangeCompany = event => {
    setCompany(event.target.value);
  };

  const handleUploadClick = async event => {
    console.log('handleUploadClick');
    console.log(event.target.files);

    const photoFile = event.target.files[0];
    const base64 = await convertBase64(photoFile);
    console.log(base64);

    setPhotoUser(base64);
  };

  const convertBase64 = photoFile => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(photoFile);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  const onClickSignUp = event => {
    event.preventDefault();

    /*
    console.log('UserForm onClickSignUp');
    console.log(
      `name: ${name} username: ${username} birthDate: ${birthDate} sex: ${sex} email: ${email} company: ${company}`
    );
    */

    /* Inicializando o usuário com os dados informados */
    var newUser = {
      username: username,
      emails: [
        {
          address: email,
          verified: false,
        },
      ],
      password: password,
      profile: {
        name: name,
        birthDate: birthDate,
        sex: sex,
        company: company,
        photouser: photouser,
      },
    };

    Meteor.call('accounts.createUser', newUser, function (error) {
      /* console.log(error); */
      if (error) {
        console.log(`Erro ao tentar criar um novo usuário: ${error.reason}`);
      } else {
        console.log(`Usuário ${username} criado com sucesso!`);
        Meteor.loginWithPassword(
          newUser.username,
          newUser.password,
          function (error) {
            if (error) {
              console.log(error);
              console.log(`Erro ao realizar o login do novo usuário: ${error}`);
            } else {
              console.log(
                `Login do usuário ${username} realizado com sucesso!`
              );
              navigate('/tasks');
            }
          }
        );
      }
    });
  };

  const onClickCancelButton = event => {
    /* console.log('UserForm onClickCancelButton'); */
    navigate('/');
  };

  return (
    <>
      <Header>📝️ Meteor Advanced To-Do List with React!</Header>
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h5" align="center">
          User Registration
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '400px' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={onClickSignUp}
        >
          <Container
            align="center"
            maxWidth="xs"
            sx={{ display: 'flex', paddingLeft: '0px' }}
          >
            <div>
              <TextField
                required
                id="outlined-basic-name"
                label="Name"
                type="text"
                variant="outlined"
                value={name}
                onChange={handleChangeName}
              />
            </div>
            <div className="photo-perfil">
              <input
                accept="image/*"
                id="icon-button-photo-perfil"
                type="file"
                style={{ display: 'none' }}
                onChange={handleUploadClick}
              />
              <label htmlFor="icon-button-photo-perfil">
                <IconButton
                  color="primary"
                  aria-label="upload photo perfil"
                  component="span"
                >
                  {photouser ? (
                    <Avatar
                      alt="Foto do perfil do usuário"
                      src={photouser}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} />
                  )}
                </IconButton>
              </label>
            </div>
          </Container>
          <Container component="main" maxWidth="xs">
            <TextField
              required
              id="outlined-basic-username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              onChange={handleChangeUsername}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              value={password}
              onChange={handleChangePassword}
            />
            <TextField
              required
              id="outlined-basic-email"
              label="e-mail"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleChangeEmail}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DatePicker
                  id="outlined-birth-date"
                  label="Birth Date"
                  inputFormat="dd/MM/yyyy"
                  views={['day', 'month', 'year']}
                  mask="__/__/____"
                  value={birthDate}
                  onChange={handleChangeBirthDate}
                  renderInput={params => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
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
              value={company}
              onChange={handleChangeCompany}
            />
            <Container
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
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Container>
          </Container>
        </Box>
      </Container>
      <Outlet />
    </>
  );
}
