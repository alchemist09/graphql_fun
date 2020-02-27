import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import BookList from './components/BookList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Apollo Client for the GraphQL Server</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
