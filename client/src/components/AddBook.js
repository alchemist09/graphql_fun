import React, { Component } from 'react';
import { graphql } from 'apollo-boost';
import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
{
  authors {
    surname
    titles
    id
  }
}
`

class AddBook extends Component {

  render() {
    console.log(this.props);
    return (
      <form>
        <div>
          <label htmlFor="name">Book Name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="name">Author</label>
          <select>
            <option>Select Author</option>
          </select>
        </div>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook);