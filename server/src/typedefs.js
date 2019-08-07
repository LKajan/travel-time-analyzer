const { gql } = require('apollo-server')

const typeDefs = gql`

input LocationInput {
  lat: Float!
  lon: Float!
  type: TravelType
  time: TravelTime
}

enum TravelType {
  WALK
  BIKE_FAST
  BIKE_SLOW
  PUBLIC
  CAR
}

enum TravelTime {
  MIDDLEDAY
  RUSH
}

type Trip {
  from_id: Int!
  to_id: Int!
  walk_t: Int
  walk_d: Int
  bike_s_t: Int
  bike_f_t: Int
  bike_d: Int
  pt_r_tt: Int
  pt_r_t: Int
  pt_r_d: Int
  pt_m_tt: Int
  pt_m_t: Int
  pt_m_d: Int
  car_r_t: Int
  car_r_d: Int
  car_m_t: Int
  car_m_d: Int
  car_sl_t: Int
}

type TravelTimeAverage {
  to_id: Int
  travel_time_avg: Int!
  geometry: String
}

type Query {
  "Returns all trips from a given start location."
  travelTimesFrom(from: [LocationInput!]!): [Trip]
  "Returns all trips to a given end location."
  travelTimesTo(to: [LocationInput!]!): [Trip]
  "Returns a trip from a given start location to a given end location."
  travelTime(from: LocationInput!, to: LocationInput!): Trip
  "Returns a aggregate of travel times."
  travelTimeAverage(locations: [LocationInput!]!, limitMax: Int): [TravelTimeAverage!]!
}

`

module.exports = typeDefs
