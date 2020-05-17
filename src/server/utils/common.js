/* Use RegEx to match email address returned from Microsoft Graph API */
exports.validateEmail = profile => {
  return (
    profile &&
    profile._json &&
    profile._json.preferred_username.match(
      /^[A-Za-z0-9._%+-]+@link.cuhk.edu.hk$/
    )
  );
};

/* Use RegEx and other helper functions to parse sid, first, last, email from Azure profile */
exports.extractAzureProfile = profile => {
  const { preferred_username: email, name: fullName } = profile._json;
  const sid = email.match(/[^@]+/)[0];
  const lastName = fullName
    .split(' ')[0]
    .slice(0, -1)
    .toLowerCase();
  const firstName = fullName.slice(fullName.indexOf(' ')).toLowerCase();
  return { sid, firstName, lastName, email };
};

/* Middleware to check for logged-in user session */
exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  return res.status(401).json({
    Error: 'User not authenticated.'
  });
};

/* Middleware to check for completed-profile user session */
exports.isCompleteAuthenticated = (req, res, next) => {
  if (req.user && req.user.isComplete) return next();
  return res.status(401).json({
    Error: 'User profile not complete.'
  });
};
