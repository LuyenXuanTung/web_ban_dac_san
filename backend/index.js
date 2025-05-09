const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use('/api',router)
app.use(express.json())



const PORT = 8080 || process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server is running");
    console.log("Connect to DB");
})
})
