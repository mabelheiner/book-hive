const express = require('express');
const booksRouter = express.Router();

const bookController = require('../controllers/book.cjs')

booksRouter.get('/', bookController.getAll);
booksRouter.get('/:id', bookController.getSingle);
booksRouter.post('/', bookController.createBook);
booksRouter.put('/:id', bookController.updateBook);
booksRouter.delete('/:id', bookController.deleteBook)

module.exports = booksRouter;