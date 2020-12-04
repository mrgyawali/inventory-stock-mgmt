const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const orderCreatedWebhook = require('./controllers/orderCreated')

app.use('/orderCreated', orderCreatedWebhook)

const PORT = 4000;
app.listen(PORT,() => {
  console.log(`running on port ${PORT} 🚀`)
})