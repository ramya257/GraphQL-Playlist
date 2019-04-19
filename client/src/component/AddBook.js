import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

//declaring query
const getAuthorsQuery=gql`{
  authors{
    name
    id
  }
}
`
class AddBook extends Component{



}
