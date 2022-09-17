import mongoose from 'mongoose'

const HotelSchema = new mongoose.Schema({
    hotelId: {
        type: String,
        default: function () {
            return Math.floor(Math.random() * 10000000)  
        },
        index: {unique: true},
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        require: true,
    },
    type: {
        type: String,   // Hotel, Restro, Office space, etc.
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    rooms: {
        type: [String],
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true,
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model("Hotel", HotelSchema);