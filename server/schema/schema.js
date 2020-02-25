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
  GraphQLList
} = graphql;

// const books = [
//   { id: "1", name: "High Performance JavaScript", genre: "Scalability", authorID: "1"},
//   { id: "2", name: "Angles and Demons", genre: "Science Fiction", authorID: "2"},
//   { id: "3", name: "Code Complete", genre: "Software Engineering", authorID: "3"},
//   { id: "4", name: "Da Vince Code", genre: "Fantasy", authorID: "2"},
//   { id: "5", name: "The Lost Symbol", genre: "Science Fictionm", authorID: "2"},
//   { id: "6", name: "Clean Code", genre: "Software Engineering", authorID: "3"}
// ]

// const authors = [
//   { id: "1", surname: "Zakas", titles: 4 },
//   { id: "2", surname: "Brown", titles: 3 },
//   { id: "3", surname: "Potter", titles: 9 }
// ]

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
    titles: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorID: parent.id })
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
        // return _.find(books, { id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
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
        surname: { type: GraphQLString },
        titles: { type: GraphQLInt }
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
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorID: { type: GraphQLID }
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