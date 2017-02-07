import Bot, { Messages } from 'node-line-messaging-api'
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
const PORT = process.env.PORT || 3002
let bot = new Bot(process.env.CHANNEL_SECRET, process.env.CHANNEL_ACCESS_TOKEN, { webhook: { port: PORT } })

bot.on('webhook', w => console.log(`bot listens on port ${w}.`))
