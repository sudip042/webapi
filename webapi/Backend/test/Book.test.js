const Book = require('../models/Book');
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

describe('Book  Schema test', () => {
    it('Add Book testing', () => {
        const book = {
            'Carselection': 'Hyundai Aura'
        };
        return Book.create(book)
            .then((books) => {
                expect(books.model).toEqual('Hyundai Aura');
            });
    });

    it('to test the delete book is working or not', async () => {
        const status = await Book.deleteMany();
        expect(status.ok).toBe(1);
    });
}) 
//booktest