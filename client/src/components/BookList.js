import React, { Component } from 'react';
import { graphql} from '@apollo/react-hoc';
import { getBooksQuery } from '../queries';
import BookDetail from './BookDetail';

class BookList extends Component {

  displayBooks() {
    const { data, error } = this.props;
    if(data.loading) {
      return (
        <p>Loading .....</p>
      );
    }
    
    if(error) {
      return (
        <p>Error! {error}</p>
      )
    }
    
    return data.books.map(book => {
      return (
        <li key={book.id}>{book.name}</li>
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetail />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);