import mongoose from "mongoose";

const automakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Automaker = mongoose.model('Automaker', automakerSchema);

export default Automaker;