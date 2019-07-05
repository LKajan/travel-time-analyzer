
const { Pool } = require('pg')

const connectionString = `postgresql://${process.env.DATABASE_URL}`

const pool = new Pool({
  connectionString: connectionString,
})

module.exports = pool
