import React, { useContext, useEffect } from 'react';
import ProfileData from '../components/SimilarUserCards';
import { UserContext } from '../contexts/UserProvider';
import Redirect from 'react-router-dom/es/Redirect';

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  /* user.update represents a re-render of UserProvider to get updated user info */
  if (user.update) return <div>loading</div>;

  /* Check for complete profile */
  if (!user.isComplete) return <Redirect to='/register' />;

  /* Call ProfileData sub-component to render list of K-Nearest-Neighbors */
  return (
    <div>
      <ProfileData />
    </div>
  );
};

export default Profile;
