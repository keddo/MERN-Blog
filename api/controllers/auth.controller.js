import User from '../models/User.model.js'
import {StatusCodes} from 'http-status-codes'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import {errorHandler} from '../utils/error.js'
import { hashPassword } from '../utils/user_utils.js'

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
   const hashedPassword = await hashPassword(password);
      // add user to db
   await User.create({
      username,
      email,
      password: hashedPassword
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
      res.status(StatusCodes.OK).cookie('access_token', token).json(rest)
   } catch (error) {
      next(error)
   }
} 

export const google = async (req, res, next) => {
   const {email, name, googlePhotoUrl} = req.body;
   try
   {
     const user = await User.findOne({email});
     if(user)
     {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3h'})
      const {password, ...rest} = user._doc;
      res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
     }
     else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      const newUser = new User({
         username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-3),
         email,
         password: generatedPassword,
         profilePicture: googlePhotoUrl
      });
      await newUser.save()
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '3h'})
      const {password, ...rest} = newUser._doc;
      res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
     } 
   }
   catch(error){
     next(error);
   }
}