import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import connectDB from './config/db.js'
import router from './routes/users.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/users', router)

const listener = app.listen(process.env.PORT || 3000, () => {
  connectDB()
  console.log('Your app is listening on port ' + listener.address().port)
})
