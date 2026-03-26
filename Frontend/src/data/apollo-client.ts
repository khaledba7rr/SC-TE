// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://bahr-backend-scandi.duckdns.org/graphql', // live endpoint
  // uri: 'http://localhost:8000/graphql', // Local development endpoint
  cache: new InMemoryCache(),
});

export default client;
