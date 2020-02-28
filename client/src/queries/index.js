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

export {
  getAuthorsQuery,
  getBooksQuery
}