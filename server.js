var app = require('express')()
var server = require('http').Server(app)
// var bodyParser = require('body-parser')
var LINEBot = require('line-messaging')
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */
// app.set('port', (process.env.PORT || 4000))

var bot = LINEBot.create({
  channelID: '<your channel ID>',
  channelSecret: '<your channel secret>',
  channelToken: '<your channel token>'
}, server)
app.use(bot.webhook('/webhook'))

// bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {})
server.listen(8080)
// app.listen(app.get('port'), function () {
//   console.log('run at port', app.get('port'))
// })
