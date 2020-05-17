const fs = require('fs');
const path = require('path');

/* Use neo4jSchema.graphql to generate javascript executable schema definition */
/* Do this by parsing the file and converting to string in utf-8 */
module.exports = fs
  .readFileSync(path.join(__dirname, 'neo4jSchema.graphql'))
  .toString('utf-8');
