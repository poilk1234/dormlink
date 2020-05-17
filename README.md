# DormLink

## For TAs/Graders

- This app is NOT bootstrapped with Create-React-App. We manually configured Webpack and Express to allow for this combined and modularized file structure
- Check `webpack.config.js` to see how we bundle our JSX and ES6, CSS and SCSS, and images and SVGs. See `src/server/server.js` for how we serve them to the client
- We also set up ESLint and prettier, whilst following AirBnB's style guide to maintain best JavaScript coding practices
- A `.env` file is required to successfully build this project on your own system. Please don't hesitate to ask us for it if you are missing it.

## Installation

- This guide assumes you have a basic competence with a command line tool like Terminal. If you need to learn more, click [here](https://www.davidbaumgold.com/tutorials/command-line/).
- Retrieve `.env` from our WhatsApp or Discord group. I'll frequently update it on those platforms, but prefer to keep it off GitHub since it contains sensitive personal and group data.

##### Project Code

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- Clone the repository to your machine. Run `git clone https://github.com/seanohare98/dormlink.git`.

##### MySQL Relational Database

- Install [MySQL](https://www.mysql.com/downloads/).
- [Create a MySQL user and database](https://dev.mysql.com/doc/mysql-getting-started/en/).
- Fill out associated credentials in `.env`.

##### Neo4j Graph Platform

- Install [Neo4j](https://subscription.packtpub.com/book/big_data_and_business_intelligence/9781783287253/1/ch01lvl1sec12/single-node-installation-of-neo4j-over-mac-os-x).
- Download [Neo4j Desktop](https://neo4j.com/download-center/#desktop).
- Create a version `v3.5.17` database instance.
- Install plugin for [Neo4j Graph Data Science](https://neo4j.com/docs/graph-data-science/current/installation/#_supported_neo4j_versions) library.
- Fill out associated credentials in `.env`.

##### Node.js Backend

- Install [Node.js](https://nodejs.org/en/download/).
- Run `node --version` and make sure it's `v12.10.0` or higher.
- Run `npm --version` and make sure it's `6.13.1` or higher.
- Note: you may need to downgrade node on Windows machines (there have been issues with Node on Windows in general).

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

#### Learning:

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

#### Research:

- [K-Nearest-Neighbor Neo4j Implementation Examples](https://neo4j.com/docs/graph-algorithms/current/labs-algorithms/approximate-nearest-neighbors/)
- [GraphQL Auth](https://github.com/apollographql/graphql-tools/issues/313)
