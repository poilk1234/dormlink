import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SIMILAR, USER_SID } from '../utils/gqlQueries';
import { UserContext } from '../contexts/UserProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import avatar from '../../../public/avatar.jpg';
import Redirect from 'react-router-dom/es/Redirect';

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

const levels = {
  0: '⭐',
  25: '⭐⭐',
  50: '⭐⭐⭐',
  75: '⭐⭐⭐⭐',
  100: '⭐⭐⭐⭐⭐'
};

const UserCard = props => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const { data, error, loading } = useQuery(USER_SID, {
    variables: { sid: props.sid }
  });

  if (redirect) {
    return <Redirect to={redirectUrl} />;
  }

  const handleClickViewProfile = () => {
    setRedirect(true);
    setRedirectUrl('/user/' + props.sid);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

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

export default () => {
  const [user, setUser] = useContext(UserContext);
  const { loading, error, data } = useQuery(SIMILAR, {
    variables: { sid: user.sid, hostel: user.hostelId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  const userCards = data.similar.map(({ sid, age, gender }) => (
    <UserCard key={sid} sid={sid} gender={gender} age={age} />
  ));

  return data.similar.length ? (
    userCards
  ) : (
    <div>No student from your hostel has registered right now</div>
  );
};
