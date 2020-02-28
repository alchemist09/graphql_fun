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
      return <p>Loading.......!</p>
    } 

    if(data.error) {
      return <p>Error, { error }</p>
    }

    return data.authors.map(author => {
      return <option key={author.id} value={author.surname}>{author.surname}</option>
    })
  }

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
            {this.displayAuthors()}
          </select>
        </div>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook);