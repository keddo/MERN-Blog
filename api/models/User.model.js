import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
}, {timestamps: true});

// Hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    try {
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = bcrypt.hash(user.password, salt);
       user.password = hashedPassword;
       next();
    } catch (error) {
        next(error);
    }
});

// userSchema.methods.createJWT = function() {
//     return jwt.sign({
//         userId: this._id, name: this.name
//     }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_LIFETIME
//     })
// }

userSchema.methods.comparePassword = async function(canditatePassword){
   const isMatch = await bcrypt.compare(canditatePassword, this.password)
   return isMatch;
}
const User = mongoose.model('User', userSchema);

export default User;
