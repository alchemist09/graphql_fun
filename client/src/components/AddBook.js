import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
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

  displayAuthors() {
    const { data, error } = this.props;
    if(data.loading) {
      return <option disabled>Loading Authors.......!</option>
    } 

    if(data.error) {
      return <option>Error, { error }</option>
    }

    return data.authors.map(author => {
      return <option key={author.id} value={author.surname}>{author.surname}</option>
    })
  }

  render() {
    console.log(this.props);
    return (
      <form id="add-book">
        <div className="field">
          <label htmlFor="name">Book Name</label>
          <input type="text" />
        </div>
        <div className="field">
          <label htmlFor="genre">Genre</label>
          <input type="text" />
        </div>
        <div className="field">
          <label htmlFor="name">Author</label>
          <select>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook);