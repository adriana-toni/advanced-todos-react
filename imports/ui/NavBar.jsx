import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function UserData({ sx, username, navigate }) {
  const onClickLogout = () => {
    if (username) {
      navigate('/');
      Meteor.logout();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {username ? (
        <>
          <Typography variant="h5" color="textSecondary" align="center" {...sx}>
            <Container>Hi {username}!</Container>
          </Typography>
          <IconButton
            aria-label="logout"
            color="primary"
            align="center"
            onClick={onClickLogout}
          >
            <LogoutOutlinedIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5" color="textSecondary" align="center" {...sx}>
            <Container>&nbsp;</Container>
          </Typography>
        </>
      )}
    </Box>
  );
}

export default function NavBar() {
  const user = useTracker(() => Meteor.user());

  const drawerWidth = user ? 200 : 0;
  console.log(`drawerWidth ${drawerWidth}`);

  let navigate = useNavigate();

  const onClickHome = () => {
    if (user) {
      navigate('/welcome');
    } else {
      navigate('/');
    }
  };

  const onClickPerfil = () => {
    navigate('/user', { state: { pathOrigin: '/welcome', user: user } });
  };

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {user ? (
          <>
            <Toolbar>
              <UserData
                sx={{ mt: 8 }}
                username={user.username}
                navigate={navigate}
              />
            </Toolbar>
            <List>
              <ListItem key="Home" disablePadding>
                <ListItemButton onClick={onClickHome}>
                  <ListItemIcon>
                    <HomeOutlinedIcon sx={{ fontSize: 56, mt: 4 }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" sx={{ paddingLeft: 2 }} />
                </ListItemButton>
              </ListItem>
              <ListItem key="Perfil" disablePadding>
                <ListItemButton onClick={onClickPerfil}>
                  <ListItemIcon>
                    <Avatar
                      alt="Foto do perfil do usuário"
                      src={user.profile.photouser}
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Perfil" sx={{ paddingLeft: 2 }} />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : (
          ''
        )}
      </Drawer>
    </Box>
  );
}
