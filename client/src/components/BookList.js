import React, { Component } from 'react';
import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      genre
    }
  }
`

class BookList extends Component {
  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book Title</li>
        </ul>
      </div>
    )
  }
}

export default BookList;