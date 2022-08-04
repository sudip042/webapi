const Cars = require('../models/Cars');
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

describe('Cars  Schema test', () => {
    it('Add Cars testing', () => {
        const Car = {
            'model': 'Hyundai'
        };
        return Cars.create(Car)
            .then((Cars) => {
                expect(Cars.model).toEqual('Hyundai');
            });
    });

    // it('to test the delete Car is working or not', async () => {
    //     const status = await Cars.deleteMany();
    //     expect(status.ok).toBe(1);
    // });
    // car test
}) 