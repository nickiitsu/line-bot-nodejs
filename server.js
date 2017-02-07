var express = require('express')
var bodyParser = require('body-parser')
// var request = require('request')
// var https = require('https')
const LineBot = require('line-bot-api')
var app = express()
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// var client = LineBot.client({
//   channelID: process.env.CHANNEL_ID,
//   channelSecret: process.env.CHANNEL_SECRET,
//   channelToken: process.env.CHANNEL_ACCESS_TOKEN
// })

const client = new LineBot({
  channelToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
})

var message = {
  type: 'text',
  text: ''
}
app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  message.text = text
  client.replyMessage(replyToken, message).then((response) => { console.log(response) })
  .catch((response) => {
    console.log(response.body)
    console.log(response.status)
  })

  res.sendStatus(200)
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
