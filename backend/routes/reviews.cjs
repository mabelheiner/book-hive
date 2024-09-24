const express = require('express');
const reviewsRouter = express.Router();

const reviewsController = require('../controllers/review.cjs')

reviewsRouter.get('/', reviewsController.getAll);
reviewsRouter.get('/:id', reviewsController.getSingle);
reviewsRouter.post('/', reviewsController.createReview);
reviewsRouter.put('/:id', reviewsController.updateReview);
reviewsRouter.delete('/:id', reviewsController.deleteReview);

module.exports = reviewsRouter;