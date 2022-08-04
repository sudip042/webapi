const User = require('../models/User');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/testingOnlineCarservicing';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Schema testing', () => {
    var id = '';
    // adding register
    it('User register testing', () => {
        const user = {
            fullname: 'Sagar KC',
            email: 'kc.sagar09@gmail.com',
            phonenumber: '9808195944',
            address: 'Kathmandu',
            username: 'sagar',
            password: 'sagar',
            cnfpassword: 'sagar',
            usertype: 'User'
        };

        return User.create(user)
            .then((user_res) => {
                id = user_res._id;
                expect(user_res.fullname).toEqual('Sagar KC');
            });
    });

    //update user
    it('UserUpdate testing', () => {

        const userup = {

            fullname: 'Saurav'
        }
        console.log(id)
        return User.findByIdAndUpdate(id, userup, { new: true })
            .then((userupd) => {
                expect(userupd.username).toEqual('Saurav KC');
            });
    });


});


//userupdate test