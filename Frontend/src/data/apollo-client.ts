// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://bahr-backend-scandi.duckdns.org/graphql', // your endpoint
  cache: new InMemoryCache(),
});

export default client;
