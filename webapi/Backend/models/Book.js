const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    fullname: {
        type: String
    },
    phonenumber: {
        type: String
    },
    address: {
        type: String
    },
    Carselection: {
        type: String
    },
    locationselection: {
        type: String
    },
    dateselection: {
        type: String
    },

})

userSchema.methods.generateAuthToken = async function () {
    const book = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    console.log(token);
    book.tokens = book.tokens.concat({ token: token })
    await book.save()
    return token
}

// const User = mongoose.model('users', userSchema)
const Book = mongoose.model('book', userSchema);


module.exports = Book;
    //User is const name