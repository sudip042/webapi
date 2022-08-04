const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Car = mongoose.model('Cars', {

    model: {
        type: String
    },
    carimg: {
        type: String
    },
    manufacturer: {
        type: String
    },
    assembly: {
        type: String
    },
    engine: {
        type: String
    },
    power: {
        type: String
    },
    mileage: {
        type: String
    },
    gear: {
        type: String
    },
    fuel: {
        type: String
    },
    abs: {
        type: String
    },
    wheels: {
        type: String
    },
    tyre: {
        type: String
    }


})


module.exports = Car;
    //User is const name