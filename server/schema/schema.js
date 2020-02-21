const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLID, 
  GraphQLSchema 
} = graphql;

const books = [
  { id: "1", name: "High Performance JavaScript", genre: "Scalability", authorID: "1"},
  { id: "2", name: "Angles and Demons", genre: "Science Fiction", authorID: "2"},
  { id: "3", name: "Code Complete", genre: "Software Engineering", authorID: "3"}
]

const authors = [
  { id: "1", surname: "Zakas", titles: 4 },
  { id: "2", surname: "Brown", titles: 3 },
  { id: "3", surname: "Potter", titles: 9 }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorID })
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    surname: { type: GraphQLString },
    titles: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})