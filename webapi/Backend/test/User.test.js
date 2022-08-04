const User = require('../models/User');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/testingOnlineCarservicing'; // use the new name of the database 

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('User  Schema test', () => {
    it('Add User testing', () => {
        const user = {
            'username': 'Sagar'
        };
        return User.create(user)
            .then((users) => {
                expect(users.username).toEqual('Sagar');
            });
    });

    it('to test the delete user is working or not', async () => {
        const status = await User.deleteMany();
        expect(status.ok).toBe(1);
    });
}) 
//user test