import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import createError from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(req.cookies.access_token);
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"))
        req.user = user;
        // console.log(req.user);
        next();
    })
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized"))
        }
    })
}

/**
 * 
 export const verifyAdmin = (req, res, next) => {
     console.log("hello")
    verifyToken(req, res, next, () => {
        console.log(req.user);
        console.log(req);
        console.log(req.user);
        console.log(req.user.isAdmin);
        if (req.user.isAdmin === true) {
            next()
        } else {
            return next(createError(403, "You are not an admin"))
        }
    })
}
*/

export const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    // const id = req.params.id;
    // const fetchUser = await User.findById(id);
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"))
        req.user = user;
        // next();
        if (req.user.isAdmin == true) {
            next()
        } else {
            return next(createError(403, "You are not an admin"))
        }
    })
    // console.log(fetchUser)

    // jwt.verify(token, process.env.JWT, fetchUser)
}