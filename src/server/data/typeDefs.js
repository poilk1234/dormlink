const { gql } = require('apollo-server-express');

/* Define GraphQL schema according to MySQL database design */
const typeDefs = gql`
  type User {
    sid: ID!
    firstName: String!
    lastName: String!
    email: String
    schedule: Int
    cleanliness: Int
    participation: Int
    studious: Int
    hostel: Hostel
    isComplete: Boolean!
  }
  type Hostel {
    id: ID!
    affiliation: String
    users: [User]
  }
  type Query {
    user: User
    userSid(sid: ID!): User
    usersHostel: [User]
    users: [User!]!
    hostel(id: ID!): Hostel
    hostels: [Hostel!]!
  }
  type Mutation {
    updateUser(
      sid: ID!
      hostel: ID
      schedule: Int
      cleanliness: Int
      participation: Int
      studious: Int
    ): Int
    deleteUser(sid: ID!): Int
  }
`;

module.exports = typeDefs;
