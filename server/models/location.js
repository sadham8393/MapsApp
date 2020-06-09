const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    area: {
        type: String
    }
});

module.exports = mongoose.model("Location", locationSchema, "location");