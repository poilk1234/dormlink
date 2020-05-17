/* Authorization (login (OAuth), logout, session-management) Routes */
const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../utils/common');
const User = require('../models').user;

/* Route to attempt AzureAD OAuth flow using OpenIdConnect */
/* Implements passport middleware and error handling redirection */
router.get(
  '/azure',
  passport.authenticate('azuread-openidconnect', {
    successRedirect: '/',
    failureRedirect: '/error'
  })
);

/* Post route to redirect during second stage of AzureAD OAuth using OpenIDConnect */
router.post(
  '/azure/redirect',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/error'
  }),
  (req, res) => {
    if (req.user.isComplete) res.redirect('/');
    else res.redirect('/register');
  }
);

/* Logout route for user session */
router.get('/logout', (req, res) => {
  /* Destroy session and handle errors/redirect */
  req.session.destroy(err => {
    if (err) res.redirect('/error');
    res.redirect('/');
  });
});

/* Provides client with user info from current session */
/* Implements isAuthenticated custom middleware for security */
router.get('/user', isAuthenticated, async (req, res) => {
  /* Fetch user data from MySQL by session sid */
  const user = await User.findAll({ where: { sid: req.user.sid } });

  /* Parse, format, and return fields to client */
  user[0].dataValues.sid = user[0].dataValues.sid.toString();
  req.user = user[0].dataValues;
  res.json(req.user);
});

module.exports = router;
