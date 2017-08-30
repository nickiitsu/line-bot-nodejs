var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(req.body.events[0])

    
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello' || text === 'ดี') {
  var  text1={
        type: 'text',
        text: 'สวัสดีครับผม 􀄃􀄭shiny􏿿 สอบถามกันได้เลยครับ เช่น'
      }; 
  var  text2={
        type: 'text',
        text: 'ดูเวรวันปกติ พิมพ์ >> เวรโอที/โอที/OT/เวรวันปกติ'
      }; 
  var  text3={
        type: 'text',
        text: 'ดูเวรวันหยุด พิมพ์ >> กศบป./เวรเสาร์อาทิตย์/กศบป/เวรวันหยุด'
      }; 
  }
  if (text === 'เวรโอที'|| text === 'โอที'|| text === 'OT'|| text === 'ot'|| text === 'เวรวันปกติ') {
  var  text1={
        type: 'text',
        text: 'โย่ว'
      };
  var  text2={
        "type":"text",
        "text":'เวรโอทีเดือนนี้'
      };
    var text3=  {
    "type": "image",
    "originalContentUrl": "https://passport.skru.ac.th/evaluate/SKRU_Line_Bot/server/php/files/p1.jpg",
    "previewImageUrl": "https://passport.skru.ac.th/evaluate/SKRU_Line_Bot/server/php/files/p1.jpg"
};  
  }
if (text === 'เวร กศบป'|| text === 'กศบป'|| text === 'เวรวันหยุด' || text === 'กศบป.') {
  var  text1={
        type: 'text',
        text: 'โย่ว'
      };
  var  text2={
        "type":"text",
        "text":'เวร กศบป.เดือนนี้'
      };
    var text3=  {
    "type": "image",
    "originalContentUrl": "https://passport.skru.ac.th/evaluate/SKRU_Line_Bot/server/php/files/p2.jpg",
    "previewImageUrl": "https://passport.skru.ac.th/evaluate/SKRU_Line_Bot/server/php/files/p2.jpg"
}; 
  }  
 sendText(sender, text1,text2,text3)
  res.sendStatus(200)
})

function sendText (sender, text1,text2,text3) {
  let data = {
    to: sender,
    messages: [ text1 ,   text2  ,   text3   ]
  }

  
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer +zZRwehzcl2nnalC+aAVyrF4SSIaZBfR3NWuhjnkiauU5LV24oQcqQfyO5DSHe//A1br67NIP2wGE9eoe4VEDeWANsUDa5iN3VJ/cZK7fOinYmRYi40Wyte09bpRo4l4LBTGTCoIYXDmDipie0lSiAdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
