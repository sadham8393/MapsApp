const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    latitude: {
        type: Number,
        required: [true, 'Latitude field is required']
    },
    longitude: {
        type: Number,
        required: [true, 'Longitude field is required']
    },
    area: {
        type: String,
        required: [true, 'Area field is required']
    },
    city: {
        type: String
    },
    country: {
        type: String
    }
}, {
    collection: 'location',
    timestamps: true
});

module.exports = mongoose.model("Location", locationSchema);