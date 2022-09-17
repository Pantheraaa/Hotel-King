import mongoose from 'mongoose';
import emailValidator from 'email-validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true,
        validate: function () {
            return this.confirmPassword === this.password;
        }
    },
    isAdmin: {
        type: Boolean,
        require: true,
    },
},
    { timestamps: true }    
)

UserSchema.pre('save', function () {
    this.confirmPassword == undefined;
})

UserSchema.pre('save', async function () {
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
})

export default mongoose.model("User", UserSchema);