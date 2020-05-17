const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
/* Use Sequelize for level of abstraction over MySQL db */
/* This provides well-defined data and ability to load in dummy data and many other features */
/* We can correct database mismatches easily in this way */

const basename = path.basename(__filename);
const db = {};

/* Connect to MySQL using environment variables */
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  }
);

/* Define Sequelize database using predefined models (user.js, hostel.js) */
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* Export Sequelize db object for use throughout server */
module.exports = db;
