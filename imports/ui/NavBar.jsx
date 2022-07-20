import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const drawerWidth = 200;

function UserData({ sx, username }) {
  return (
    <Typography variant="h5" color="textSecondary" align="center" {...sx}>
      {username ? (
        <Container>Hi {username}!</Container>
      ) : (
        <Container>&nbsp;</Container>
      )}
    </Typography>
  );
}

export default function NavBar() {
  const user = useTracker(() => Meteor.user());

  let navigate = useNavigate();

  const onClickHome = () => {
    navigate('/');
    Meteor.logout();
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
        <Toolbar>
          {user ? (
            <UserData sx={{ mt: 8, mb: 4 }} username={user.username} />
          ) : (
            <UserData sx={{ mt: 8, mb: 4 }} username={null} />
          )}
        </Toolbar>
        <List>
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick={onClickHome}>
              <ListItemIcon>
                <HomeOutlinedIcon sx={{ fontSize: 56 }} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ paddingLeft: 2 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Perfil" disablePadding>
            <ListItemButton onClick={onClickPerfil}>
              <ListItemIcon>
                {user ? (
                  <Avatar
                    alt="Foto do perfil do usuário"
                    src={user.profile.photouser}
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <AccountCircleOutlinedIcon sx={{ fontSize: 56 }} />
                )}
              </ListItemIcon>
              <ListItemText primary="Perfil" sx={{ paddingLeft: 2 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
