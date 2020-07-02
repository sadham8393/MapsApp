const express = require('express');
const router = express.Router()

const Location = require('../models/location');
var ObjectID = require('mongoose').Types.ObjectId

const paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        const totalRecords = await model.countDocuments().exec();
        results.totalRecords = totalRecords;

        if (endIndex < totalRecords) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}


router.get('/location', paginatedResults(Location), (req, res, next) => {
    res.json(res.paginatedResults);
})

router.post('/location', (req, res) => {
    const { latitude, longitude, area, city, country } = req.body;
    const newLocation = new Location({
        latitude: latitude, longitude: longitude, area: area, city: city, country: country
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
    const { latitude, longitude, area, city, country } = req.body;
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send({ message: 'No record with given id : ' + req.params.id });

    let updatedRecord = {
        latitude, longitude, area, city, country
    }

    Location.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, { new: true }, (err, docs) => {
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

router.delete('/location/:location', (req, res) => {
    const location = JSON.parse(req.params.location);
    const { _id, area, areaArr } = location;
    Location.deleteMany({ _id: { $in: _id } }, function (err) {
        if (!err) {
            return res.json({
                message: `Location ${area || areaArr} deleted successfully`
            })
        } else {
            res.status(400).json({
                message: err.message
            })
        }
    });
})

module.exports = router;