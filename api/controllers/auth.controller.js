import User from '../models/User.model.js'
import {StatusCodes} from 'http-status-codes'
import {body, validationResult} from 'express-validator'
export const signup = async (req, res) => {
   // check if attributes are not empty
   const {username, email, password} = req.body;
   if(!username || !email || !password || username === '' || email === '' || password === ''){
      return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Missing attributes or empty'})
   }
   // Validate user input
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
   }
   // check user don't exist
   const user = await User.findOne({email})
   if(user){
      return res.status(StatusCodes.BAD_REQUEST).json({msg: 'User already exists.'})
   }
   // add user to db
   await User.create({
      username,
      email,
      password
   });
   // send user response
   res.status(StatusCodes.CREATED).json({msg: 'User registered successfully.'})
}
export const signin = (req, res) => {
   res.json({msg: 'sign in endpoint'})
}