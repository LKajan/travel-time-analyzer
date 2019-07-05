
const { matrix } = require('./data')
const dbPool = require('./db')

const getCellId = async (location) => {
  const sql = 'SELECT 1'
  const { lat, lon } = location
  try {
    const { rows } = await dbPool.query(sql)
    if (rows.length) return rows[0]
  } catch(err) {
    console.log(err.stack)
  }
  return null
}

const resolvers = {
  Query: {
    travelTimesFrom(root, args, context, info){
      const cellIds = args.from.map(from => getCellId(from))
      const cellId = cellIds[0]
      return matrix.filter(trip => trip.source === cellId)
    }
  }
}

module.exports = resolvers
