import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getAuthorsQuery } from '../queries';

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
  }

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

  render() {
    console.log(this.props);
    return (
      <form id="add-book">
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

export default graphql(getAuthorsQuery)(AddBook);