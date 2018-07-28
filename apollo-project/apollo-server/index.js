const express = require('express');
const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = gql`${fs.readFileSync(__dirname + '/schema/root.graphql', 'utf8')}`;
import resolvers from './resolvers'

const PORT = 4000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

/*
 fetch('/graphql' , {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ movies { title } }' })
})
 */
