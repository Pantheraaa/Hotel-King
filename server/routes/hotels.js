import express from 'express';
import { createHotel, deleteHotel, getAllHotels, getHotelById, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//GET ALL HOTEL
router.get('/', getAllHotels)

//GET HOTEL BY ID
router.get('/:id', getHotelById)

//CREATE NEW HOTEL
router.post('/create-hotel', verifyAdmin, createHotel)

//UPDATE AN EXISTING HOTEL
router.put('/:id', verifyAdmin, updateHotel)

//DELETE AN EXISTING HOTEL
router.delete('/:id', verifyAdmin, deleteHotel)

export default router;