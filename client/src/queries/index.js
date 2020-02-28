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
  mutation {
    addBook(name: "", genre: "", authorID: "") {
      name
      genre
      authorID
    }
  }
`

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
}