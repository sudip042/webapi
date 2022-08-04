const mongoose = require('mongoose');
const BookParts = mongoose.model('bookparts', {

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
    },
    fullname: {
        type: String
    }
});


module.exports = BookParts;
    //User is const name