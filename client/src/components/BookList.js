import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql} from '@apollo/react-hoc';

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
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          <li>Book Title</li>
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);