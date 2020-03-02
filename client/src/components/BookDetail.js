import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getBookQuery } from '../queries';

class BookDetail extends Component {
  render() {
    return (
      <div id="book-detail">
        <p>Book Details Goes Here</p>
      </div>
    )
  }
}

export default graphql(getBookQuery)(BookDetail);