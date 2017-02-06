var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */
console.log(process.env.CHANNEL_ACCESS_TOKEN)

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/webhook', function (req, res) {
  console.log('show reply token :::::', req.body.events[0].replyToken)
  console.log('send from userId :::::::::::', req.body.events[0].message.text)
  console.log('sender source ::::', req.body.events[0].source.userId)
  res.sendStatus(200)
})

// function sendTextMessege () {}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
