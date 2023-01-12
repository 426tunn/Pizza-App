const jwt = require('jsonwebtoken');
const logger = require('../logging/logger');
require('dotenv').config();

const signup_post = (req, res, next) => {
       try{ res.json({
            message: 'Signup Sucessful',
            user: req.user
        })
    } catch(error) {
        logger.error(error);
        next(error)
    }
    }


    const login_post = (error, req, res, next, user, info)=> {
        
            try{
                if(error || !user){
                    const error = info ? info: new Error("An error occurred in logging in user");
                    error.status = 400, error.statusCode = 400;
                    return next(error);
                }
               
                req.login(user, {session: false},
                    async(error) => {
                        if(error) return next(error);

                        const body = {_id: user._id, email: user.email};

                        const token = jwt.sign({user: body}, process.env.JWT_SECRET, {expiresIn: "1hr"}); 
                         
                        return res.json({message: 'Logged in successfully', token})
                    })
            }
            catch(error){
                return next(error)
            }
        }



module.exports = {
    signup_post, login_post
}