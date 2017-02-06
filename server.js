var express = require('express')
var bodyParser = require('body-parser')
// var request = require('request')
var https = require('https')
var app = express()
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/webhook', function (req, res) {
  // console.log('show reply token :::::', req.body.events[0].replyToken)
  // console.log('send from userId :::::::::::', req.body.events[0].message.text)
  // console.log('sender source ::::', req.body.events[0].source.userId)
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  if (text === 'สวัสดี') {
    sendTextMessege(sender, text, replyToken)
  }
  res.sendStatus(200)
})

var options = {
  host: 'api.line.me',
  // port: 443,
  path: '/v2/bot/message/reply',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer [' + process.env.CHANNEL_ACCESS_TOKEN + ']'
  }
}

function sendTextMessege (sender, text, replyToken) {
  console.log('text ::: ', text, 'sender ::: ', sender)
  var data = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: 'เราชื่อหนูหนค่ะ พี่เเต๊กสุดหล่อ'
      }
    ]
  }
  let rplyJson = JSON.stringify(data)
  var request = https.request(options, function (response) {
    console.log('Status: ' + response.statusCode)
    console.log('Headers: ' + JSON.stringify(response.headers))
    response.setEncoding('utf8')
  })
  request.on('error', function (e) {
    console.log('Request error: ' + e.message)
  })
  request.end(rplyJson)

  // request({
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer [' + process.env.CHANNEL_ACCESS_TOKEN + ']'
  //   },
  //   url: 'https://api.line.me/v2/bot/message/reply',
  //   method: 'POST',
  //   body: data
  // }, function (err, res, body) {
  //   if (err) console.log(err)
  //   if (res) console.log(res)
  // })
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
