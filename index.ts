import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs/index.typeDefs";

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

const startServer = async () => {
  //GraphQL
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql"
  });

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

startServer()