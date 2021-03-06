const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  name: String
  email: String
  password: String
  savedParks: [Park]!
}

type Park {
  _id: ID
  parkId: String
  parkName: String
  description: String
  image: String
  latitude: String
  longitude: String
}

type Auth {
  token: ID!
  user: User
}

input ParkInput {
  parkId: String
  parkName: String
  description: String
  image: String
  latitude: String
  longitude: String
}

type Query {
  me: User
  parks(name: String): [Park]
}

type Mutation {
  addUser(name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  savePark(input: ParkInput): Park
  removePark(parkId: ID!): Park
}
`;

module.exports = typeDefs;
