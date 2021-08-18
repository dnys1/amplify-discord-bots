import { resolve } from 'path'
import express from 'express'
import morgan from 'morgan'
import { api } from './api/index.js'
import { client } from './discord.js'
import { secrets } from './secrets.js'

const PORT = process.env.PORT ?? 3000
const APP_BUILD_DIR = resolve('packages/app/build')

function onListen() {
  console.info('API Initialized')
  try {
    client.login(secrets.DISCORD_TOKEN)
  } catch (error) {
    console.warn('Unable to start Discord bot client', error)
  }
  console.info('Ready!')
}

function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error)
  }
  response.status(500)
  response.json({ error })
}

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static(APP_BUILD_DIR))
app.use('/api', api)
app.use(errorHandler)
app.listen(PORT, onListen)
