/* All client-side GraphQL calls are defined here */
import { gql } from 'apollo-boost';

/* GraphQL query to find student by sid from Neo4j */
const STUDENT = gql`
  query Student($sid: String!) {
    Student(sid: $sid) {
      hostel
      age
      gender
    }
  }
`;

/* GraphQL query to find user by sid from MySQL */
const USER_SID = gql`
  query userSid($sid: ID!) {
    userSid(sid: $sid) {
      firstName
      lastName
      email
      schedule
      studious
      cleanliness
      participation
      hostel {
        id
      }
    }
  }
`;

/* GraphQL query to find all K-Nearest-Neighbors for user by sid and hostel from Neo4j */
const SIMILAR = gql`
  query similar($sid: String, $hostel: String) {
    similar(sid: $sid, hostel: $hostel) {
      sid
      age
      gender
    }
  }
`;

/* GraphQL mutation to delete user profile from MySQL */
const DELETE_USER = gql`
  mutation deleteUser($sid: ID!) {
    deleteUser(sid: $sid)
  }
`;

/* GraphQL mutation to update user profile during registration */
const UPDATE_USER = gql`
  mutation updateUser(
    $sid: ID!
    $hostel: ID
    $schedule: Int
    $cleanliness: Int
    $studious: Int
    $participation: Int
  ) {
    updateUser(
      sid: $sid
      hostel: $hostel
      schedule: $schedule
      cleanliness: $cleanliness
      studious: $studious
      participation: $participation
    )
  }
`;

/* GraphQL mutation to create student in Neo4j */
const MERGE_STUDENT = gql`
  mutation MergeStudent(
    $sid: String!
    $hostel: String!
    $age: Int
    $gender: String
  ) {
    CreateStudent(sid: $sid, hostel: $hostel, age: $age, gender: $gender) {
      sid
    }
  }
`;

/* GraphQL mutation to update student profile during registration in Neo4j */
const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $sid: String!
    $hostel: String!
    $age: Int
    $gender: String
  ) {
    UpdateStudent(sid: $sid, hostel: $hostel, age: $age, gender: $gender) {
      sid
    }
  }
`;

/* GraphQL mutation to add student HAS_TRAIT relationship */
const ADD_TRAIT_STUDENT_TRAITS = gql`
  mutation UpdateTraitStudentTraits(
    $from: _StudentInput!
    $to: _TraitInput!
    $data: _HasTraitInput!
  ) {
    AddTraitStudentTraits(from: $from, to: $to, data: $data) {
      from {
        sid
      }
      to {
        name
      }
      strength
    }
  }
`;

/* GraphQL mutation to delete student profile from Neo4j */
const DELETE_STUDENT = gql`
  mutation DeleteStudent($sid: String!) {
    DeleteStudent(sid: $sid)
  }
`;

/* GraphQL mutation to update student profile during preference updates */
const UPDATE_AGAIN = gql`
  mutation updateAgain($sid: String!) {
    updateAgain(sid: $sid)
  }
`;

/* GraphQL mutation to update student HAS_TRAIT relationships during preference updates */
const UPDATE_TRAIT_STUDENT_TRAITS = gql`
  mutation UpdateTraitStudentTraits(
    $from: _StudentInput!
    $to: _TraitInput!
    $data: _HasTraitInput!
  ) {
    UpdateTraitStudentTraits(from: $from, to: $to, data: $data) {
      from {
        sid
      }
      to {
        name
      }
      strength
    }
  }
`;

export {
  STUDENT,
  USER_SID,
  SIMILAR,
  UPDATE_USER,
  DELETE_USER,
  MERGE_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  UPDATE_TRAIT_STUDENT_TRAITS,
  ADD_TRAIT_STUDENT_TRAITS,
  UPDATE_AGAIN
};
