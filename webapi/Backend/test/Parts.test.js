const Parts = require('../models/Parts');
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

describe('Parts  Schema test', () => {
    it('Add Parts testing', () => {
        const part = {
            'partsname': 'engine'
        };
        return Parts.create(part)
            .then((parts) => {
                expect(parts.model).toEqual('engine');
            });
    });

    it('to test the delete parts is working or not', async () => {
        const status = await Parts.deleteMany();
        expect(status.ok).toBe(1);
    });
}) 
//parts test