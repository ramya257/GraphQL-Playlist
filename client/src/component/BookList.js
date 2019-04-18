import React, { Component } from 'react';
import {gql} from 'apollo-boost';

const getBooksQuery=gql`{
  books{
    name
    id
  }
}
`

class BookList extends Component {
  render() {
    return (
      <div>
      <ul id="book-list">
      <li>Book Name</li>
      </ul>

      </div>
    );
  }
}

export default BookList;
