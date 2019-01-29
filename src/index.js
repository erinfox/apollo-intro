import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import App from './App';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://snowtooth.moonhighway.com',
});

console.log(client);

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
