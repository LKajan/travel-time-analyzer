require('dotenv').config()
const dbPool = require('./db')

const fields = [
  'walk_t',
  'walk_d',
  'bike_s_t',
  'bike_f_t',
  'bike_d',
  'pt_r_tt',
  'pt_r_t',
  'pt_r_d',
  'pt_m_tt',
  'pt_m_t',
  'pt_m_d',
  'car_r_t',
  'car_r_d',
  'car_m_t',
  'car_m_d',
  'car_sl_t'
]
const fieldList = fields.join(',\n')

const traveltime = async (from, to) => {
  console.log(from, to)

  const query = `SELECT
    from_id,
    to_id,
    ${fieldList}
  FROM metrop.matrix
  WHERE
    from_id = (select id from metrop.grid where st_contains(geom, ST_transform(ST_SetSRID(ST_MakePoint($2, $1), 4326), 3067)))
    AND to_id = (select id from metrop.grid where st_contains(geom, ST_transform(ST_SetSRID(ST_MakePoint($4, $3), 4326), 3067)))
  `

  const result = await dbPool.query(
    query,
    [from.lat, from.lon, to.lat, to.lon]
  )

  return result.rows[0]
}

const typeColumnMap = {
  PUBLIC: 'pt',
  CAR: 'car',
  WALK: 'walk',
  BIKE_FAST: 'bike_f',
  BIKE_SLOW: 'bike_s'
}

const getColumnName = (travelType, time) => {
  const typePart = typeColumnMap[travelType]
  if (typePart === 'walk' || typePart === 'bike_f' || typePart === 'bike_s') {
    return `${typePart}_t`
  }

  const timePart = time === 'RUSH' ? 'r' : 'm'

  return `${typePart}_${timePart}_t`
}

const travelTimeAverage = async (fromList, limitMax) => {
  const queries = fromList.map((from, index) => {
    const travelType = from.travelType || 'PUBLIC'
    const travelTime = from.travelTime || 'RUSH'
    const travelTypeColumn = getColumnName(travelType, travelTime)

    return `
      SELECT
        to_id,
        ${travelTypeColumn} t
      FROM
        metrop.matrix
      WHERE
        from_id = (select id from metrop.grid where st_contains(geom, ST_transform(ST_SetSRID(ST_MakePoint($${index * 2 + 2}, $${index * 2 + 1}), 4326), 3067)))`
  })

  let query = `
    SELECT
      to_id,
      SUM(t)/${fromList.length}::int travel_time_avg,
      (select ST_AsGeoJSON(st_transform(geom, 4326)) from metrop.centroids where id = to_id) geometry
    FROM (
      ${queries.join(`\nUNION ALL\n`)}
    ) foo
    GROUP BY to_id
    HAVING
      COUNT(t) = ${fromList.length}`

  const valueList = fromList.reduce((accumulator, value) => [...accumulator, value.lat, value.lon], [])

  if (limitMax) {
    query += ` AND SUM(t)/${fromList.length} <= $${fromList.length * 2 + 1}`
    valueList.push(limitMax)
  }

  const result = await dbPool.query(query, valueList)

  return result.rows
}

const resolvers = {
  Query: {
    travelTime: async (root, args) => {
      const res = await traveltime(args.from, args.to)
      return res
    },
    travelTimeAverage: async (root, args) => {
      const res = await travelTimeAverage(args.locations, args.limitMax)
      return res
    }
  }
}

module.exports = resolvers

/*
(async () => {
  const res = await travelTimeAggregate([{ lat: 60.22842, lon: 24.66848 }, { lat: 60.24753, lon: 24.79845 }])
  console.log(res)
})()
*/
