import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPerson: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        require: true,
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}],
},
    { timestamps: true }
)

// roomNumbers format would like be: 
/**
 * [
 *  {number: 101, unavailableDates: [01-09-2022, 02-09-2022]}
 *  {number: 102, unavailableDates: [04-09-2022, 03-09-2022]}
 *  {number: 103, unavailableDates: [05-09-2022, 09-09-2022]}
 *  {number: 104, unavailableDates: [03-09-2022, 01-09-2022]}
 *  {number: 105, unavailableDates: [06-09-2022, 08-09-2022]}
 * ]
 */
export default mongoose.model("Room", RoomSchema);