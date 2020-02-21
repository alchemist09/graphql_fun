const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const books = [
  { id: "1", name: "High Performance JavaScript", genre: "Scalability"},
  { id: "2", name: "Angles and Demons", genre: "Science Fiction"},
  { id: "3", name: "Code Complete", genre: "Software Engineering"}
]

const authors = [
  { id: "1", surname: "Zakas", titles: 4 },
  { id: "2", surname: "Brown", titles: 3 },
  { id: "3", surname: "Potter", titles: 9 }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    surname: { type: GraphQLString },
    titles: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})