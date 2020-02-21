const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
  { id: "1", name: "High Performance JavaScript", genre: "Scalability"},
  { id: "2", name: "Angles and Demons", genre: "Science Fiction"},
  { id: "3", name: "Code Complete", genre: "Software Engineering"}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString}
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