require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')


const app = express()

//  since dev ui runs on port 8000 and server runs on port 4000
app.use(cors({
	origin: true
}))

app.use('/', express.static(path.join(__dirname, '../public')))
app.get('*', (_req, res) => { res.sendFile(path.join(__dirname, '../public', 'index.html'))})
console.warn(`> 💻  UI ready on ${process.env.URL}`)

app.listen('8000', (err) => {
	if (err) throw err
})