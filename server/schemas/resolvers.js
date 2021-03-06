const { AuthenticationError } = require('apollo-server-express');
const { User, Park } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {

    me: async (parent, args, context) => {

      if(context.user) {
        console.log('jhlaksjdfhalksdjfhalksdfjhlksdf');
        console.log(context.user);
          const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('parks')
      
          return userData;
      }

      throw new AuthenticationError('You are not logged in')

  },

    // ******000000
    // me: async (parent, args, context) => {
    //   console.log('!!!!!!!!!!!');
    //   console.log(context.user);
    //   console.log('!!!!!!!!-------');
    //   console.log(input);
    //   if (context.user) {
    //     return User.findOne({ name: context.user.name }).populate('savedParks');
        
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // **** older
    // me: async (parent, { name }) => {
    //   return User.findOne({ name }).populate('savedParks');
    // },
    // parks: async (parent, { name }) => {
    //   const params = name ? { name } : {};
    //   return Park.find(params).sort({ createdAt: -1 });
    // },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      console.log("add user")
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      console.log(token)
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // **** Discussed with Dru
    savePark: async (parent, { input }, context) => {   // $$$-----
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      console.log('$$$$$$$$$$$$$$$');
      console.log(context.user);
      console.log('$$$$$$$-------');
      console.log(input);
      if (context.user) { 
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedParks: input },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }   
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    removePark: async (parent, { userId, parkId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: parkId },
          {
            $pull: {
              parks: {
                _id: parkId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },





  },
};

module.exports = resolvers;
