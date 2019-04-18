import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
//react-apollo--->binding apollo to react which helps react understand apollo
//ApolloProvider-->we need it to wrap application and inject any data receieved from server into application


//components

import BookList from './component/BookList';

const client= new ApolloClient({
  uri:'http://localhost:4000/graphql' // path from where we will make the requests to Apollo from this end point
})


class App extends Component {
  render() {
    return (
      //dynamically giving input to the client attribute
      //surrouding our app and receiving the data from client which has one end point and then injecting into them
      <ApolloProvider client={client}>
      <div id="main">
      <h1> Ramya's Reading list</h1>
      <BookList/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
