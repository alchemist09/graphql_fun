import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { compose } from 'recompose';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorID: ""
    }

    this.handleBookNameChange = this.handleBookNameChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayAuthors() {
    const { getAuthorsQuery, error } = this.props;
    if(getAuthorsQuery.loading) {
      return <option disabled>Loading Authors.......!</option>
    } 

    if(getAuthorsQuery.error) {
      return <option>Error, { error }</option>
    }

    return getAuthorsQuery.authors.map(author => {
      return <option key={author.id} value={author.id}>{author.surname}</option>
    })
  }

  handleBookNameChange(evt) {
    this.setState({
      name: evt.target.value
    })
  }

  handleGenreChange(evt) {
    this.setState({
      genre: evt.target.value
    })
  }

  handleAuthorChange(evt) {
    this.setState({
      authorID: evt.target.value
    })
  }

  handleSubmit(evt) {
    const { name, genre, authorID } = this.state;
    evt.preventDefault();
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorID
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Book Name</label>
          <input type="text" onChange={this.handleBookNameChange} />
        </div>
        <div className="field">
          <label htmlFor="genre">Genre</label>
          <input type="text" onChange={this.handleGenreChange} />
        </div>
        <div className="field">
          <label htmlFor="name">Author</label>
          <select onChange={this.handleAuthorChange} value={this.state.authorID}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);