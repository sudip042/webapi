const Parts = require('../models/Parts');
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

describe('Parts Schema testing', () => {
    var id = '';
    // adding Parts
    it('Parts adding testing', () => {
        const part = {
            partsimg: 'Parts.png',
            partsname: 'Clause',
            price: '8000',
            model: 'Hyundai Aura',
            description: 'This clause is very important'
        };

        return Parts.create(part)
            .then((part_res) => {
                id = part_res._id;
                expect(part_res.partsname).toEqual('Clause');
            });
    });

    //update Parts
    it('PartsUpdate testing', () => {

        const partsup = {

            model: 'Hyundai'
        }
        console.log(id)
        return Parts.findByIdAndUpdate(id, partsup, { new: true })
            .then((partsupd) => {
                expect(partsupd.model).toEqual('Hyundai');
            });
    });


});


//partsupdate test