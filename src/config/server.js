const port = 3003

/* PM2
$ pm2 list
$ pm2 stop     <app_name|id|'all'|json_conf>
$ pm2 restart  <app_name|id|'all'|json_conf>
$ pm2 delete   <app_name|id|'all'|json_conf>
$ pm2 describe <id|app_name>
$ pm2 monit
*/

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(allowCors)

server.listen(port, '0.0.0.0', function(){
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server