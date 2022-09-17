import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
        res.send("Hello admin, You are logged in and you can delete all account");
    })
    
//UPDATE
router.put('/:id', verifyUser, updateUser)

//DELETE
router.delete('/:id', verifyUser, deleteUser)

//GET
router.get('/:id', verifyUser, getUserById)

//GET ALL
router.get('/', verifyAdmin, getAllUsers)

export default router;


// --> Tests:
/**
    630b9576366c9ac21b3925b9 - rahul
    {
        "username":"co-rahul",
        "password":"Crritrahul@1"
    }
    

    630b9075bc0e983674cb8cba - pb
    {
        "username":"prathambharti795",
        "password":"Pratham@123"
    }
 */