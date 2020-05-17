import React, { useContext, useState } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { SIMILAR, USER_SID } from '../utils/gqlQueries';
import { UserContext } from '../contexts/UserProvider';

/* Create custom styles for SimilarUser cards */
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 320,
    width: '100%',
    height: '100%',
    margin: 'auto'
  },
  media: {
    paddingTop: '56.25%' // 16:9
  },
  content: {
    flexGrow: 1
  },
  avatar: {
    backgroundColor: red[500]
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

const UserCard = props => {
  /* Define custom styles */
  const classes = useStyles();

  /* Implement local redirect state */
  const [redirect, setRedirect] = useState(false);

  /* Implement local redirectUrl state */
  const [redirectUrl, setRedirectUrl] = useState('');

  /* Call GraphQL server for user information */
  const { data, error, loading } = useQuery(USER_SID, {
    variables: { sid: props.sid }
  });

  /* Handle redirect to more detailed user view */
  if (redirect) {
    return <Redirect to={redirectUrl} />;
  }

  /* Handle click to view profile */
  const handleClickViewProfile = () => {
    setRedirect(true);
    setRedirectUrl('/user/' + props.sid);
  };

  /* Handle GraphQL server return types */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  /* Render card for individual user */
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {data.userSid.firstName[0] + data.userSid.lastName[0]}
            </Avatar>
          }
          title={data.userSid.firstName + ' ' + data.userSid.lastName}
          titleTypographyProps={{ variant: 'h5' }}
        />
        <Divider />
        <CardContent className={classes.content}>
          <table style={{ width: '80%', margin: 'auto' }}>
            <tr>
              <td style={{ width: '50%' }}>Night Owl: </td>
              <td>{levels[data.userSid.schedule]}</td>
            </tr>
            <tr>
              <td style={{ width: '50%' }}>Cleanliness: </td>
              <td>{levels[data.userSid.cleanliness]}</td>
            </tr>
            <tr>
              <td style={{ width: '50%' }}>Social: </td>
              <td>{levels[data.userSid.participation]}</td>
            </tr>
            <tr>
              <td style={{ width: '50%' }}>Studious: </td>
              <td>{levels[data.userSid.studious]}</td>
            </tr>
          </table>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary' onClick={handleClickViewProfile}>
            {'View ' + data.userSid.firstName + "'s Profile"}
          </Button>
        </CardActions>
      </Card>
      <div style={{ height: '20px', width: '100%', clear: 'both' }} />
    </div>
  );
};

/* Default export is Map of cards for all K-Nearest-Neighbors of logged-in user */
export default () => {
  const [user, setUser] = useContext(UserContext);

  /* Fetch sid for every recommended roommate (KNN) */
  const { loading, error, data } = useQuery(SIMILAR, {
    variables: { sid: user.sid, hostel: user.hostelId }
  });

  /* Handle GraphQL return types */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  /* Iterate through every recommended user and generate UserCard for them */
  const userCards = data.similar.map(({ sid, age, gender }) => (
    <UserCard key={sid} sid={sid} gender={gender} age={age} />
  ));

  return data.similar.length ? (
    userCards
  ) : (
    <div>No student from your hostel has registered right now</div>
  );
};
