var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(req.body.events[0])
  pushMessage(sender, text, replyToken)
  res.sendStatus(200)
})

function pushMessage (sender, text, replyToken) {
  var data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞' + text
      }
    ]
  }
  var options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/push',
    body: data,
    json: true,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.TOKEN
    }
  }

  request(options, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
