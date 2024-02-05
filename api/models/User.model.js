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
    profilePicture: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
}, {timestamps: true});

// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password, salt)
})

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
