const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { info } = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery',false)

info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app