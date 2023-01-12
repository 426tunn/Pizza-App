const express = require('express');
const authRoute = require('./Routes/authRoutes')
const orderRoute = require('./Routes/orderRoutes')
const passport = require("passport")
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const logger = require('./logging/logger');

require('./AuthMiddleware/auth') //sign up and sign autheentication middleware

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/', authRoute)
app.use('/orders', passport.authenticate('jwt', { session: false  }), orderRoute)

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


//Security Middleware
app.use(helmet())

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.get('/', (req, res) => {
    logger.info('WELCOME')
    res.status(200).send({
        message: 'Welcome To 426Pizza!!!!'
    })
});

app.use((err, req, res, next) => {
    // console.log(err);
    res.status(500).json({
        error: err.message
    })
})


module.exports = app
