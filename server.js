var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var linebot = require('linebot')
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const parser = bodyParser.json({
  verify: function (req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding)
  }
})

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

app.post('/linewebhook', parser, function (req, res) {
  if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
    return res.sendStatus(400)
  }
  bot.parse(req.body)
  return res.json({})
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
