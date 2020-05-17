import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { UserContext } from '../contexts/UserProvider';
import { useQuery } from '@apollo/react-hooks';
import { USER_SID } from '../utils/gqlQueries';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Redirect from 'react-router-dom/es/Redirect';

/* User defined preferences */
const fieldsToShow = [
  'email',
  'schedule',
  'cleanliness',
  'participation',
  'studious',
  'hostelId'
];

/* Available selections */
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

/* Define custom styles for UserPage */
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

/* isNull(object) function */
const isNull = obj => {
  return typeof obj == 'undefined' || obj === null;
};

export default () => {
  /* Implement useParams hook and custom userContext context */
  const { sid } = useParams();
  const [user, setUser] = useContext(UserContext);

  /* Provide sid to parameterized query (prevent SQL injections) */
  const { data, error, loading } = useQuery(USER_SID, {
    variables: { sid: sid }
  });

  /* Use page styles */
  const classes = useStyles();

  /* Check for account completion and redirect accordingly */
  if (!user.isComplete) return <Redirect to='/register' />;

  /* Check param sid against userContext to prevent unauthorized access */
  if (sid === user.sid) {
    return <ProfilePage />;
  }

  /* Handle GraphQL return types */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;
  if (!data.userSid) return <p>User Not Found</p>;

  data.userSid.hostelId = data.userSid.hostel.id;

  /* Render list of user profile information */
  return (
    <div>
      <Typography variant='h6' classes={{ root: classes.title }}>
        {data.userSid.firstName +
          ' ' +
          data.userSid.lastName +
          "'s Profile Summary"}
      </Typography>
      <List classes={{ root: classes.demo }} dense>
        {fieldsToShow.map(key => (
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
                isNull(data.userSid[key])
                  ? 'Unknown'
                  : isNull(levels[data.userSid[key]])
                  ? data.userSid[key]
                  : levels[data.userSid[key]]
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
