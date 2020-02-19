const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { GraphQLString },
    author: { GraphQLString },
    genre: { GraphQLString}
  })
});