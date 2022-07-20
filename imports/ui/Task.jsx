import React from 'react';

import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getTimeFrom } from '/imports/helpers/dateHelpers';

export default function Task({ task, onEditClick, onDeleteClick }) {
  console.log('Renderizando Task');

  const timeTask = getTimeFrom(task.createdAt);
  const titleTask = `${timeTask} - ${task.text}`;

  return (
    <>
      <Card>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AssignmentOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={titleTask} secondary={task.userCreation} />
          <IconButton aria-label="delete" onClick={() => onDeleteClick(task)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => onEditClick(task)}>
            <EditIcon />
          </IconButton>
        </ListItem>
      </Card>
    </>
  );
}
