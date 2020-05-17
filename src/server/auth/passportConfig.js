const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');
const { validateEmail, extractAzureProfile } = require('../utils/common.js');
const User = require('../models').user;

/* Configure Microsoft AzureAD OpenId Flow using Passport.js */
/* Store all sensitive data (e.g. api keys, secrets) as environment variables */
/* Implement session management and client cookies */
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: process.env.AZURE_IDENTITY_METADATA,
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      scope: process.env.AZURE_SCOPE,
      redirectUrl: process.env.AZURE_REDIRECT_URL,
      responseType: process.env.AZURE_RESPONSE_TYPE,
      responseMode: process.env.AZURE_RESPONSE_MODE,
      passReqToCallback: true,
      validateIssuer: false,
      allowHttpForRedirectUrl: true,
      useCookieInsteadOfSession: true,
      cookieEncryptionKeys: [
        {
          key: process.env.PASSPORT_COOKIE_KEY,
          iv: process.env.PASSPORT_COOKIE_IV
        }
      ]
    },
    (req, iss, sub, profile, accessToken, refreshToken, done) => {
      /* Call validateEmail function to verify CUHK domain user */
      if (!validateEmail(profile)) return done(null, false);

      /* Call extractAzureProfile to parse Microsoft GraphAPI return */
      const userInfo = extractAzureProfile(profile);

      /* Handle new user creation or returning user by querying MySQL */
      return User.findOrCreate({
        where: { sid: userInfo.sid },
        defaults: { ...userInfo, isComplete: false }
      }).then(([user]) => {
        done(null, user);
      });
    }
  )
);

/* Handle encryption */
passport.serializeUser((user, callback) => {
  callback(null, user);
});

/* Handle decryption */
passport.deserializeUser((user, callback) => {
  callback(null, user);
});
