const Book = require('../models/book.cjs')

const getAll = async (req, res) => {
    const books = await Book.find();
    res.setHeader('Content-Type', 'application/json');
    res.json(books);
    
}

const getSingle = async (req, res) => {
    const books = await Book.findById(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.json(books);
}

const createBook = async (req, res) => {
    const book = {
        "title": req.body.title,
        "author": req.body.author,
        "isbn": req.body.isbn,
        "image": req.body.image,
        "rating": req.body.rating
    }
    const newBook = new Book(book);
    await newBook.save();
    res.json(newBook);
}

const updateBook = async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        image: req.body.image,
        rating: req.body.rating
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {new: true});
    res.json(updatedBook);
}

const deleteBook = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({message: 'Book deleted successfully.'})
}

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}