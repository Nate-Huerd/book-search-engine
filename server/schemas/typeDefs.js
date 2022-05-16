const { gql } = require("apollo-server-express");

// reference module 21.8/server/schemas/typeDefs.js for guidance
const typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, password: String!, email: String!): Auth
    saveBook(body: saveBookInput): User
    removeBook(bookId: String!): User
  }
  input saveBookInput {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
  }
  type Book {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;