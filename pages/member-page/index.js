import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';

export default function AlignItemsList() {
  const members = [
    {
      avatar: <AssignmentIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <AssignmentIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <PageviewIcon />,
      name: "Vipul Dalal",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <FolderIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <LockOutlinedIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <AssignmentIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <AssignmentIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <PageviewIcon />,
      name: "Vipul Dalal",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <FolderIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <LockOutlinedIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <AssignmentIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <AssignmentIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <PageviewIcon />,
      name: "Vipul Dalal",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <FolderIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <LockOutlinedIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <AssignmentIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <AssignmentIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <PageviewIcon />,
      name: "Vipul Dalal",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <FolderIcon />,
      name: "Parth Chugh",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      avatar: <LockOutlinedIcon />,
      name: "Chugh Parth",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },

  ]
  return (
    <div className='d-flex flex-wrap main-content'>
      {members.map(el => (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                {el.avatar}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {el.name}
                  </Typography>
                  {" "}- {el.desc}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>

  );
}