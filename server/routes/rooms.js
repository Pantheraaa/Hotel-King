import express from 'express';

const router = express.Router();
import {verifyAdmin} from '../utils/verifyToken.js'
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/room.js';

// router.get('/', (req, res) => {
//     res.send('Hello, This is room endpoint')
// })

//GET ALL ROOM
router.get('/', getAllRooms)

//GET UNIQUE ROOM
router.get('/:id', getRoomById)

//CREATE A NEW ROOM
router.post('/:hotelId/create-room', verifyAdmin, createRoom)

//UPDATE AN EXISTING ROOM
router.put('/:id', verifyAdmin, updateRoom)

//DELETE AN EXISTING ROOM
router.delete('/:id', verifyAdmin, deleteRoom)

export default router;