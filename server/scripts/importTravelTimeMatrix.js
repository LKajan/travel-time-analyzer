require('dotenv').config()

var fs = require('fs')
const path = require('path');

const dbPool = require('./src/db')
var copyFrom = require('pg-copy-streams').from

const args = process.argv.slice(2)

const importFile = (filePath) => {
  dbPool.connect(function(err, client, done) {
    var stream = client.query(copyFrom('COPY my_table FROM STDIN'));
    var fileStream = fs.createReadStream(filePath)
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream);
  })
}

fs.readdir(args[0], function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err)
    }
    files.forEach(file => importFile(file))
})
