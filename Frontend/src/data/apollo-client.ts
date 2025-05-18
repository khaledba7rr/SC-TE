// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://www.khaledba7r-backend.wuaze.com/graphql', // your endpoint
  cache: new InMemoryCache(),
});

export default client;
