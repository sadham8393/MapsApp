const express = require('express');
const router = express.Router()

const Location = require('../models/Location');
var ObjectID = require('mongoose').Types.ObjectId

router.get('/location', (req, res) => {
    Location.find()
        .then(location => {
            res.json(location);
        })
        .catch(err => res.status(400).json({
            message: err.message
        }))
})

router.post('/location', (req, res) => {
    const { latitude, longitude, area } = req.body;
    const newLocation = new Location({
        latitude: latitude, longitude: longitude, area: area
    })
    newLocation.save()
        .then(() => res.json({
            message: `Location ${area} added successfully`
        }))
        .catch(err => res.status(400).json({
            message: err.message
        }))
})

router.put('/location/:id', (req, res) => {
    const { latitude, longitude, area } = req.body;
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'No record with given id : ' + req.params.id });

    let updatedRecord = {
        latitude, longitude, area
    }

    Location.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
        if (!err) {
            return res.json({
                message: `Location ${area} updated successfully`
            })
        } else {
            res.status(400).json({
                message: err.message
            })
        }
    });
})

router.delete('/location/:area', (req, res, next) => {
    Location.deleteMany({area: { $in: req.params.area.split(',')}}, function(err) {
        if (!err) {
            return res.json({
                message: `Location ${req.params.area} deleted successfully`
            })
        } else {
            res.status(400).json({
                message: err.message
            })
        }
    });
})

module.exports = router;