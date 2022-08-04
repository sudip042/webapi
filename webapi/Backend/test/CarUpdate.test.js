const Cars = require('../models/Cars');
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

describe('Cars Schema testing', () => {
    var id = '';
    // adding Cars
    it('Cars Adding testing', () => {
        const Cars = {
            model: 'Hyundai Aura ',
            carimg: 'duke.jpg',
            manufacturer: 'South Korea',
            assembly: 'Hyundai',
            engine: '400mm',
            power: '1186cc',
            mileage: '20.50km/l',
            fuel: 'Petrol/diesel/cng',
            abs: 'abs',
            wheels: '4 wheelers',
            tyre: 'MRF'
            
        };

        return Cars.create(Cars)
            .then((Car_res) => {
                id = Car_res._id;
                expect(Car_res.manufacturer).toEqual('South Korea');
            });
    });

    //update user
    it('CarUpdate testing', () => {

        const Carup = {

            manufacturer: 'Nepal'
        }
        console.log(id)
        return Cars.findByIdAndUpdate(id, Carup, { new: true })
            .then((Carupd) => {
                expect(Carupd.manufacturer).toEqual('Nepal');
            });
    });


});

//carupdaate

