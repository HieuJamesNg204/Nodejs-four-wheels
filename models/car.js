import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    automaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Automaker',
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    bodyStyle: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    engineType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    }
});

const Car = mongoose.model('Car', carSchema);

export default Car;