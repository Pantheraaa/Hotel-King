import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import createError from '../utils/error.js'
import jwt from 'jsonwebtoken';

export const register = async function register (req, res, next) {
    let userData = req.body;
    try {
        const newUser = new User({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            isAdmin: userData.isAdmin,
        })
        const userSaved = await newUser.save();
        const { password, ...otherDetails } = userSaved._doc;
        res.status(200).json({
            message: "User created successfully!",
            data: otherDetails,
        })
    } catch (err) {
        console.log(err);
    }
}

export const login = async (req, res, next) => {
    if (!req.body.username) return next(createError(404, "Enter credentials!"))
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Incorrect password!"));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const { password, isAdmin, ...userDetails } = user._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({
                message: "User logged in successfully!",
                data: userDetails,
            })
    } catch (err) {
        console.log(err);
    }
}