require('dotenv').config();
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./auth/passportConfig');
const { createHostels, createUsers } = require('./utils/dataConfig');
const { hostelInfo, students } = require('./utils/constants');
const driver = require('./utils/neo4jDriver');
const db = require('./models');
const mergedSchema = require('./data/mergedSchema');
const authRoutes = require('./auth/authRoutes');
const { isAuthenticated } = require('./utils/common');

/* Configure persistent sessions */
const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

/* Apply middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

/* Inject express.request, MySQL access, and Neo4j access into graphql context */
const server = new ApolloServer({
  schema: mergedSchema,
  context: ({ req }) => {
    return { db, driver, req };
  }
});

/* Clean, authenticate, and sync MySQL database with dummy data */
db.sequelize.authenticate().then(() => {
  db.sequelize
    .sync({
      force: true
    })
    .then(() => {
      createHostels(hostelInfo);
      createUsers(students);
    });
});

/* Define server port */
const PORT = process.env.PORT || 8080;

/* Define path for static assets (built by webpack) */
const DIST_PATH = path.join(__dirname, '../../dist');

/* Define filename for assets (also check webpack config for details) */
const HTML_FILE = path.join(DIST_PATH, 'index.html');
app.use(express.static(DIST_PATH));

/* Use passport and session management */
app.use(passport.initialize());
app.use(passport.session());

/* Use authorization routes and GraphQL API */
app.use('/auth', authRoutes);
app.use('/graphql', isAuthenticated);

/* Connect GraphQL Server to Express App */
server.applyMiddleware({ app });

/* Catch unknown URLs with index asset */
app.get('*', (req, res) => res.sendFile(HTML_FILE));

/* Listen for requests */
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
