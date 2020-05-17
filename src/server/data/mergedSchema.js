const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const neo4jTypeDefs = require('./neo4jTypeDefs');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

/* Create GraphQL schema based off neo4jTypeDefs */
const neo4jSchema = makeAugmentedSchema({
  typeDefs: neo4jTypeDefs,
  config: {
    query: {
      exclude: []
    },
    mutation: {
      exclude: []
    }
  }
});

/* Merge Neo4j schema with MySQL schema together */
const restSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/* Return combination of both schemas, allowing for access to both databases from one route */
const mergedSchema = mergeSchemas({
  subschemas: [{ schema: neo4jSchema }, { schema: restSchema }]
});

module.exports = mergedSchema;
