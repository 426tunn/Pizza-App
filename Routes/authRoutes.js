const passport = require('passport');
const express = require('express');
const authController = require('../Controllers/auth');
const {signupValidationMiddleware,
    loginValidationMiddleware} = require("../validators/users.validator")

const AuthRouter = express.Router();


AuthRouter.post('/signup', signupValidationMiddleware, passport.authenticate('signup', {session: false}), authController.signup_post)


AuthRouter.post('/login', loginValidationMiddleware, async (req, res, next) => {
    passport.authenticate('login', (error, user, info)=> {
     try{
        authController.login_post(error, req, res, next, user, info);
     } catch(error){
        next(error);
     }
    })(req, res, next)
})

module.exports = AuthRouter