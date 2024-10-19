import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";

import { resolvers } from "./resolvers/index.resolver";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { requestAuth } from "./middlewares/auth.middleware";

declare global {
  namespace Express {
    interface Request {
      user?: any;  // Or specify a more accurate type for 'user'
    }
  }
}

const startServer = async () => {
  dotenv.config();
  database.connect();

  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  //GraphQL
  app.use('/graphql', requestAuth)

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => {
      return { ...req }
    }
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