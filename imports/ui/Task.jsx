import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export default function Task({ task }) {
  console.log('Renderizando Task');
  console.log(task);

  const titleTask = `${task.createdAt} - ${task.text}`;
  const userTask = task.userId;

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AssignmentOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={titleTask} secondary={userTask} />
      </ListItem>
    </>
  );
}
