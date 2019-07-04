
const { matrix } = require('./data')

const getCellId = (location) => {
  return 1
}

const resolvers = {
  Query: {
    travelTimesFrom(root, args, context, info){
      const cellId = getCellId(args.from)
      return matrix.filter(trip => trip.source === cellId)
    }
  }
}

module.exports = resolvers
