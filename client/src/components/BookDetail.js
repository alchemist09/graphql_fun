import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getBookQuery } from '../queries';

class BookDetail extends Component {

  displayBookDetails() {
    const { book } = this.props.data
    if(book) {
      return (
        <div id="book-details">
          <hr />
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.surname}</p>
          <p>{book.author.titles}</p>
          <strong>All Books From This Author</strong>
          <ul className="other-books">
            {
              book.author.books.map(thisBook => {
                return <li key={thisBook.id}>{thisBook.name}</li>
              })
            }
          </ul>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <hr />
          <p>Book Details Goes Here</p>
        </React.Fragment>
      ); 
    }
  }

  render() {
    return (
      this.displayBookDetails()
    )
  }
}

export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.bookID
    }
  })
})(BookDetail);