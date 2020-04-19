# DormLink

## Installation

- This guide assumes you have a basic competence with a command line tool like Terminal. If you need to learn more, click [here](https://www.davidbaumgold.com/tutorials/command-line/).
- Retrieve `.env` from our WhatsApp or Discord group. I'll frequently update it on those platforms, but prefer to keep it off GitHub since it contains sensitive personal and group data.

##### Project Code

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- Clone the repository to your machine. Run `git clone https://github.com/seanohare98/dormlink.git`.

##### MySQL Database

- Install [MySQL](https://www.mysql.com/downloads/).
- [Create a MySQL user and database](https://dev.mysql.com/doc/mysql-getting-started/en/).
- Fill out the correct host/user/password/database credentials in `.env`.

##### ~~Neo4j Graph Platform~~

- ~~Neo4j integration is still in development.~~
- ~~Don't worry about it for now. I'll help you guys later.~~

##### Node.js Backend

- Install [Node.js](https://nodejs.org/en/download/).
- Run `node --version` and make sure it's `v12.10.0` or higher.
- Run `npm --version` and make sure it's `6.13.1` or higher.
- Charlie reported an issue with `apt-get` installing outdated node and npm packages, so **_double-check that your install is up-to-date!_**

#### Running DormLink on `localhost`

1. Navigate to the root directory of the project `cd dormlink`.
2. Place `.env` here with all the necessary variables filled in.
3. Use `npm i` to install dependencies (these are specified in `package.json`).
4. Use `npm run dev` to start the server and webpack build process.
5. Visit `http://localhost:8080` in your browser to use DormLife.

#### Remember:

- [Integrate prettier w/ your code editor](https://prettier.io/docs/en/editors.html).
- We should use a [feature branch workflow](https://bocoup.com/blog/git-workflow-walkthrough-feature-branches).
- Have `.env` in the **_root_** directory!
- Monitor the Webpack and nodemon output and logs if you encounter an issue.

---

## References:

#### Learning resources:

- [React](https://reactjs.org/docs/getting-started.html)
- [React Router Training](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Context State Sharing](https://dev.to/sunnysingh/sharing-state-using-reacts-context-api-3623)
- [Apollo (Client)](https://www.apollographql.com/docs/react/get-started/)
- [Material UI Docs](https://material-ui.com/)
- [UI Design Tips](https://www.crowdform.co.uk/blog/7-lesser-known-tricks-to-level-up-your-ui-design)
- [Understanding UI](https://leerob.io/blog/style-guides-component-libraries-design-systems)
- [Express](https://expressjs.com/en/starter/installing.html)
- [Webpack](https://webpack.js.org/concepts/)
- [Airbnb Style Guide](https://github.com/airbnb/javascript)

#### Research resources:

- [K-Nearest-Neighbor Neo4j Implementation Examples](https://neo4j.com/docs/graph-algorithms/current/labs-algorithms/approximate-nearest-neighbors/)
- [GraphQL Auth](https://github.com/apollographql/graphql-tools/issues/313)
