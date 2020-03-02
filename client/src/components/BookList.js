import React, { Component } from 'react';
import { graphql} from '@apollo/react-hoc';
import { getBooksQuery } from '../queries';
import BookDetail from './BookDetail';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_book: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(book_id) {
    this.setState({
      selected_book: book_id
    })
  }

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
        <li key={book.id} onClick={ (evt) => { this.handleClick(book.id, evt) }}>{book.name}</li>
      );
    });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const { selected_book } = this.state;
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetail bookID={selected_book} />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);