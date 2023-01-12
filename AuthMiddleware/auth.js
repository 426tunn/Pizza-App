const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const userModel = require('../Models/userModel')

passport.use(
    'jwt',
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (payload, done)=> {
            try {
            return done(null, payload.user); //it does 'req.user = payload.user
        } catch(error){
            done(error);
        }
        }
       
    )
);

passport.use(
    'signup',
    new localStrategy(
         {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
         },
           async(req, email, password, done)=> {
            
            try{
                const {first_name, last_name} = req.body;
                const user = await userModel.create({first_name, last_name, email, password});
                return done(null, user);
            } catch(error){

                done(error);

            }
           }
    )
);


passport.use(
    'login',
    new localStrategy(
        {
       usernameField: 'email',
       passwordField: 'password'
    },
    async (email, password, done) => {
        try{
            const user = await userModel.findOne({email});
            if(!user) {
                return done(null, flase, {message: 'User does not exist'});
            }
            const validate = await user.isValidPassword(password);
            if(!validate){
                return done(null, false, ({message: 'Incorrect Password'}));
            }

            return done(null, user, ({mesage: 'User logged in Successfully'}))
        }catch(error){
          return done(error);
        }
    }
    )
)