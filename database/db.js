const mongoose = require('mongoose');
const logger = require('./logging/logger');
require('dotenv').config();

const dbURL = process.env.DB_URL
mongoose.set({strictQuery: false})
function connectToDB() {
    mongoose.connect(dbURL)
     mongoose.connection.on("connected", ()=> {
        logger.info('Mongoose Connected')
     });
     mongoose.connection.on('error', (err)=> {
        logger.error('Connection Failed', err)
     })
}

module.exports = {connectToDB};