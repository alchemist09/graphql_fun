import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql} from '@apollo/react-hoc';

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

class BookList extends Component {

  dispayBooks() {
    const { data } = this.props;
    if(data.loading) {
      return (
        <p>Loading .....</p>
      );
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        );
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          {this.dispayBooks()}
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);