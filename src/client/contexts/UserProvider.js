import React, { createContext, useEffect, useState } from 'react';

/* Create custom context for User state throughout app */
const UserContext = createContext([{}, () => {}]);

/* Define helper functions to allow for ease-of-use of UserContext */
const UserConsumer = UserContext.Consumer;
const useUser = () => React.useContext(UserContext);

const UserProvider = props => {
  const [state, setState] = useState({ loading: true });
  console.log(state);

  /* Call useEffect hook with dependency on state.update */
  /* useEffect is called once upon initial render and then again for changes in dependencies */
  /* This allows for efficient fetching of a shared user state and easy re-fetching by setting update to true */
  useEffect(() => {
    fetch('/auth/user')
      .then(res => res.json())
      .then(res => {
        res.loading = false;
        setState(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [state.update]);

  /* Allow all children to access context */
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { useUser, UserContext, UserConsumer, UserProvider };
