// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://16.171.176.7/graphql', // your endpoint
  cache: new InMemoryCache(),
});

export default client;

// http://16.171.176.7/Backend/graphql
