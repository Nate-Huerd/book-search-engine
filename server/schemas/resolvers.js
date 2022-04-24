const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      // show an error if the user is not logged in
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
      // login function
    login: async (parent, { email, password }) => {
        // check if a user and password exist
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);

      return { token, user };
    },
    // add user function
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // save book function
    saveBook: async (parent, { body }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: body } },
          { new: true }
        );
        return updatedUser;
      }
      // if not logged in, return error
      throw new AuthenticationError("You need to be logged in!");
    },
    // remove book function
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      // if not logged in, return error
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;