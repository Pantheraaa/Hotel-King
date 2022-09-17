import bodyParser from 'body-parser';
import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
    let data = req.body;
    let newHotel = new Hotel(data)
    try {
        let savedHotel = await newHotel.save();
        res.status(200).json({
            message: "Hotel created successfully!",
            data: savedHotel,
        })
    } catch (err) {
        next(err)
    }
}

export const updateHotel = async (req, res, next) => {
    let data = req.body;
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: data })
        res.status(200).json({
            message: "Hotel updated successfully!",
            data: updatedHotel,
        })
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async(req, res, next) => {
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Hotel Deleted successfully!",
            data: deleteHotel,
        })
    } catch (err) {
        next(err)
    }
}

export const  getHotelById = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json({
            message: "Hotel fetched successfully!",
            data: hotel,
        })
    } catch (err) {
        next(err)
    }

}

export const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}