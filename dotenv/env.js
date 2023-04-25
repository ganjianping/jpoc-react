const path = require('path')
const envFilePath = path.resolve(process.cwd(), `dotenv/.env.${process.env.NODE_ENV}`)
const { API_BASE_URL, APP_VERSION } = require('dotenv').config({ path: envFilePath }).parsed || {}

module.exports = {
    API_BASE_URL,
    APP_VERSION
}
