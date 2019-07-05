const { gql } = require('apollo-server')

const typeDefs = gql`
input LocationInput {
  lat: Float!
  lon: Float!
}

type Query {
  "returns all trips from given location"
  travelTimesFrom(from: [LocationInput!]!): [Trip]
  travelTimesTo(to: [LocationInput]!): [Trip]
  travelTime(from: LocationInput!, to: LocationInput!): Trip
}

type Trip {
  source: Int!
  target: Int!
  time_1: Int
  time_2: Int
}

type Location {
  lat: Float!
  lon: Float!
}

`

module.exports = typeDefs
