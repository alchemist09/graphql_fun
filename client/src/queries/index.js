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

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorID: ID!) {
    addBook(name: $name, genre: $genre, authorID: $authorID) {
      name
      genre
      id
    }
  }
`

const getBookQuery = gql`
  query book($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        surname
        books {
          id
          title
          genre
        }
      }
    }
  }
`

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery
}