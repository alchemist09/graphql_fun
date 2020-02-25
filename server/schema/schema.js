const graphql = require('graphql');
const _ = require('lodash');
const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');

mongoose.connect("mongodb://graphql_user:password1@ds033754.mlab.com:33754/graphql_fun", { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log("Connection to the graphql_fun DB established.....");
})

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLID, 
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorID);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    surname: { type: GraphQLString },
    titles: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorID: parent.id })
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        surname: { type: new GraphQLNonNull(GraphQLString) },
        titles: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let authorObj = new Author({
          surname: args.surname,
          titles: args.titles
        });
        return authorObj.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let bookObj = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID
        });
        return bookObj.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})