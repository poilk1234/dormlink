import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FaceIcon from '@material-ui/icons/Face';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserContext } from '../contexts/UserProvider';
import Redirect from 'react-router-dom/es/Redirect';
import Button from '@material-ui/core/Button';
import { DELETE_USER } from '../utils/gqlQueries';
import { useMutation } from '@apollo/react-hooks';

/* Create custom styles for ProfilePage */
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: '#e1e3dd',
    margin: 'auto'
  },
  title: {
    textAlign: 'center'
  }
}));

/* Selection types */
const levels = {
  0: '⭐',
  25: '⭐⭐',
  50: '⭐⭐⭐',
  75: '⭐⭐⭐⭐',
  100: '⭐⭐⭐⭐⭐'
};

/* Word-mapping descriptors */
const keyMaps = {
  schedule: 'Night Owl',
  cleanliness: 'Cleanliness',
  participation: 'Social',
  studious: 'Studious'
};

const isNull = obj => {
  return typeof obj == 'undefined' || obj === null;
};

const Profile = () => {
  /* Implement userContext and deleteUser mutation hooks */
  const [user, setUser] = useContext(UserContext);
  const [deleteUser] = useMutation(DELETE_USER);

  /* Implement redirect state */
  const [redirect, setRedirect] = React.useState(false);

  /* Define custom styling */
  const classes = useStyles();

  /* Reduce user-info using Higher-Order Function to retrieve relevant fields */
  const relevant = Object.keys(user).reduce((object, key) => {
    if (
      key !== 'loading' &&
      key !== 'isComplete' &&
      key !== 'createdAt' &&
      key !== 'updatedAt'
    ) {
      object[key] = user[key];
    }
    return object;
  }, {});

  /* Check for complete profile */
  if (!user.isComplete) return <Redirect to='/register' />;

  /* Display alert before confirming profile deletion */
  const deleteAccount = () => {
    if (confirm('Are you sure?')) {
      deleteUser({ variables: { sid: user.sid } });
      setUser({});
      setRedirect(true);
    }
  };

  /* Redirect to logout route if logout button is clicked */
  if (redirect === true) return <Redirect to='/auth/logout' />;

  /* Render user avatar, and user information list */
  return (
    <div>
      <Typography variant='h6' classes={{ root: classes.title }}>
        Your Profile Summary
      </Typography>
      <div>
        <List classes={{ root: classes.demo }} dense>
          {Object.keys(relevant).map(key => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={isNull(keyMaps[key]) ? key : keyMaps[key]}
                style={{ width: '20%' }}
              />
              <ListItemText
                primary={
                  isNull(user[key])
                    ? 'Unknown'
                    : isNull(levels[user[key]])
                    ? user[key]
                    : levels[user[key]]
                }
              />
            </ListItem>
          ))}
          <ListItem style={{ margin: 'auto' }}>
            <Button color='primary' href='/edit'>
              Edit Account
            </Button>
          </ListItem>
          <ListItem style={{ margin: 'auto' }}>
            <Button onClick={deleteAccount} color='secondary'>
              Delete Account
            </Button>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Profile;
