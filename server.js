const path = require('path')
const express = require('express')
const routes = require('./backend/routes')
const bodyParser = require('body-parser')
const cors = require('cors')

const DIST_DIR = path.join(__dirname, 'client/dist')
const PORT = 5050
const app = express()

app.use(cors())
app.use(express.static(DIST_DIR))

app.use(bodyParser.json({
  limit: '2000kb'
}))

app.use('/api', routes)

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT)

console.log(`Listening on Port: ${PORT}`)