import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
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
  console.log('Renderizando UserForm');

  // Passing props from the caller
  let {
    state: { pathOrigin, user },
  } = useLocation();
  console.log(`Path Origin: ${pathOrigin}`);
  console.log(user);

  const displayLoginInfo = user ? 'none' : 'flex';
  const birth = user ? user.profile.birthDate : null;
  const initialSex = user ? user.profile.sex : '';

  const [name, setName] = useState(user?.profile.name);
  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user?.emails[0].address);
  const [sex, setSex] = useState(initialSex);
  const [company, setCompany] = useState(user?.profile.company);
  const [birthDate, setBirthDate] = useState(birth);
  const [photouser, setPhotoUser] = useState(user?.profile.photouser);

  const [messageError, setMessageError] = useState('');
  const [messageSucess, setMessageSucess] = useState('');

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

    /* Inicializando o usu??rio com os dados informados */
    var newUser = {
      username: username,
      email: email,
      password: password,
      profile: {
        name: name,
        birthDate: birthDate,
        sex: sex,
        company: company,
        photouser: photouser,
      },
    };

    setMessageError('');
    setMessageSucess('');

    if (!user) {
      // If user -> insert Mode
      // console.log('Insert User');
      Meteor.call('accounts.createUser', newUser, function (error) {
        /* console.log(error); */
        if (error) {
          console.log(`Erro ao tentar criar um novo usu??rio: ${error.reason}`);
          setMessageError(`Error trying to create a new user: ${error.reason}`);
        } else {
          console.log(`Usu??rio ${username} criado com sucesso!`);
          setMessageSucess(`User ${username} created successfully!`);
          Meteor.loginWithPassword(
            newUser.username,
            newUser.password,
            function (error) {
              if (error) {
                console.log(error);
                console.log(
                  `Erro ao realizar o login do novo usu??rio: ${error}`
                );
              } else {
                console.log(
                  `Login do usu??rio ${username} realizado com sucesso!`
                );
                navigate('/welcome');
              }
            }
          );
        }
      });
    } else {
      // Update Mode
      // console.log('Update User');
      Meteor.call(
        'accounts.updateUser',
        user._id,
        newUser.profile,
        function (error) {
          /* console.log(error); */
          if (error) {
            console.log(
              `Erro ao tentar atualizar os dados do usu??rio: ${error.reason}`
            );
            setMessageError(
              `Error trying to update user data: ${error.reason}`
            );
          } else {
            console.log(`Usu??rio ${username} atualizado com sucesso!`);
            setMessageSuccess(`User ${username} successfully updated!`);
          }
        }
      );
      navigate(pathOrigin);
    }
  };

  const onClickCancelButton = event => {
    /* console.log('UserForm onClickCancelButton'); */
    navigate(pathOrigin);
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
          User Registration
        </Typography>
        {messageError ? (
          <Alert
            severity="error"
            onClose={() => {
              setMessageError('');
            }}
            sx={{ mb: 4 }}
          >
            {messageError}
          </Alert>
        ) : (
          ''
        )}
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
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '400px' },
          }}
          maxWidth="xs"
          noValidate
          autoComplete="off"
          onSubmit={onClickSignUp}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ ml: 8 }}
          >
            <TextField
              required
              id="outlined-basic-name"
              label="Name"
              type="text"
              variant="outlined"
              value={name}
              onChange={handleChangeName}
            />
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
                    alt="Foto do perfil do usu??rio"
                    src={photouser}
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <AccountCircleOutlinedIcon sx={{ fontSize: 50 }} />
                )}
              </IconButton>
            </label>
          </Box>
          <Box
            display={displayLoginInfo}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              required
              id="outlined-basic-username"
              label="Username"
              type="text"
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
              value={password}
              onChange={handleChangePassword}
            />
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
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            </LocalizationProvider>
            <TextField
              id="outlined-select-sex"
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
              value={company}
              onChange={handleChangeCompany}
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
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
