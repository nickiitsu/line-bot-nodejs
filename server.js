var express = require('express')
var bodyParser = require('body-parser')
var linebot = require('linebot')
var app = express()

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/webhook', function (req, res) {
  res.send('connection complete')
})

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log('Success', data)
  }).catch(function (error) {
    console.log('Error', error)
  })
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
