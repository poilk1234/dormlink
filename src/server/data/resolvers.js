/* GraphQL resolvers for MySQL database */
/* Resolvers define actions and handlers for our defined GraphQL schemas */
module.exports = {
  Hostel: {
    /* Implement nested user SQL queries */
    users: parent => parent.getUsers()
  },
  User: {
    /* Implement nested hostel SQL queries */
    hostel: parent => parent.getHostel()
  },
  /* Queries (GET requests) destructure req and (MySQL) db objects from gql context */
  Query: {
    /* preform SQL query on user by primary key (sid) using session sid for security */
    user: (parent, args, { req, db }) => db.user.findByPk(req.user.id),

    /* preform SQL query on user by sid using non-session sid */
    userSid: (parent, { sid }, { db }) => db.user.findByPk(sid),

    /* preform SQL query on hostel by matching session hostelId for security */
    usersHostel: (parent, args, { req, db }) =>
      db.user.findAll({
        where: {
          hostelId: req.user.hostelId
        }
      }),

    /* SQL query to find all users */
    users: (parent, args, { db }) => db.user.findAll(),

    /* SQL query to find all hostels by primary key */
    hostel: (parent, { id }, { db }) => db.hostel.findByPk(id),

    /* SQL query to find all hostels */
    hostels: (parent, args, { db }) => db.hostel.findAll()
  },
  /* Mutations are equivalent to POST/UPDATE/DELETE requests */
  Mutation: {
    /* destructure sid, hostel, and traits from args */
    updateUser: (
      parent,
      { sid, hostel, schedule, cleanliness, participation, studious },
      { db }
    ) =>
      /* preform MySQL update on user with given values */
      db.user.update(
        {
          schedule,
          cleanliness,
          participation,
          studious,
          hostelId: hostel,
          isComplete: true
        },
        {
          where: {
            sid
          }
        }
      ),

    /* preform MySQL deletion on user with given sid */
    deleteUser: (parent, { sid }, { db }) =>
      db.user.destroy({
        where: {
          sid
        }
      })
  }
};
