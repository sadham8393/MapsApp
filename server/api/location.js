const express = require('express');
const router = express.Router()

const Location = require('../models/Location');

router.get('/location', (req, res) => {
    Location.find()
        .then(location => {
            res.json(location);
        })
        .catch(err => console.log(err))
})

router.post('/location', (req, res) => {
    const { latitude, longitude, area } = req.body;
    const newLocation = new Location({
        latitude: latitude, longitude: longitude, area: area
    })
    newLocation.save()
        .then(() => res.json({
            message: "Location marked successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Something went wrong"
        }))
})
module.exports = router;