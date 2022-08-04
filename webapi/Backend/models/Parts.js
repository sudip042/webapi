const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Parts = mongoose.model('parts', {

    partsimg: {
        type: String
    },
    partsname: {
        type: String
    },
    price: {
        type: String
    },
    model: {
        type: String
    },
    description: {
        type: String
    }
});


module.exports = Parts;
    //User is const name