const neo4j = require('neo4j-driver');
const { students, traits } = require('./constants');

/* Connect to Neo4j database using environment variables */
const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  )
);

/* Create dummy data (nodes, edges, relationships) for Neo4j */
const session = driver.session();
session.run('MATCH (n) DETACH DELETE n;').then(() => {
  session
    .run('UNWIND $props AS map CREATE (n:Trait) SET n.name = map RETURN n', {
      props: traits
    })
    .then(() => {
      session
        .run(
          'MATCH (t1:Trait { name: "schedule" }) \n' +
            'MATCH (t2:Trait { name: "studious" }) \n' +
            'MATCH (t3:Trait { name: "cleanliness" }) \n' +
            'MATCH (t4:Trait { name: "participation" }) \n' +
            'UNWIND $students AS student MERGE (s:Student { hostel: student.hostel, sid: student.sid, age: student.age, gender: student.gender})\n' +
            'MERGE (s)-[:HAS_TRAIT{strength: student.schedule}]->(t1)\n' +
            'MERGE (s)-[:HAS_TRAIT{strength: student.studious}]->(t2)\n' +
            'MERGE (s)-[:HAS_TRAIT{strength: student.cleanliness}]->(t3)\n' +
            'MERGE (s)-[:HAS_TRAIT{strength: student.participation}]->(t4)',
          {
            students
          }
        )
        .then(async () => {
          await session.close();
        });
    });
});

module.exports = driver;
