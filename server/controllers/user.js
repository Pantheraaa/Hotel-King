import bodyParser from 'body-parser';
import User from '../models/User.js';

export const updateUser = async (req, res, next) => {
    let data = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: data })
        res.status(200).json({
            message: "User updated successfully!",
            data: updatedUser,
        })
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "User Deleted successfully!",
            data: deleteUser,
        })
    } catch (err) {
        next(err)
    }
}
 
export const  getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({
            message: "User fetched successfully!",
            data: user,
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}