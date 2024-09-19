const express = require('express');
const homeRouter = express.Router();

homeRouter.use('/users', require('./users.cjs'));
homeRouter.use('/books', require('./books.cjs'));

module.exports = homeRouter;