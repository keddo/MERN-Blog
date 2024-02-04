import User from '../models/User.model.js'
import {StatusCodes} from 'http-status-codes'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import {errorHandler} from '../utils/error.js'

export const signup = async (req, res, next) => {
   // check if attributes are not empty
   const {username, email, password} = req.body;
   if (!username || !email || !password || username === '' || email === '' || password === '') {
      return next(errorHandler(400, 'All fields are required to signup.'))
   }
   // Validate user input
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
   }
   // check user don't exist
   const user = await User.findOne({email})
   if(user){
      return next(errorHandler(404, 'User already exists.'))
   }
   try {
      // add user to db
   await User.create({
      username,
      email,
      password
   });
   // send user response
   res.status(StatusCodes.CREATED).json({msg: 'User registered successfully.'})
   } catch (error) {
      next(error)
   }
}
export const signin = async (req, res, next) => {
   const {email, password} = req.body;
   if (!email || !password || email === '' || password === '') {
      return next(errorHandler(400, 'all fields are required to signin.'));
   }
   try {
      const validUser = await User.findOne({email});
      if(!validUser) return next(errorHandler(404, 'user not found'))
      const validPassword = await validUser.comparePassword(password)
      if (!validPassword) {
         return next(errorHandler(400, 'Invalid credentials'))
      }
      const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '3h'});
      const { password: pass, ...rest } = validUser._doc;
      res.status(StatusCodes.OK).cookie('access_token', token, {httpOnly: true}).json(rest)
   } catch (error) {
      next(error)
   }
} 