const express = require('express');
const favoritesRouter = express.Router();

const favoritesController = require('../controllers/favorite.cjs');

favoritesRouter.get('/', favoritesController.getAll);
favoritesRouter.get('/:id', favoritesController.getSingle);
favoritesRouter.post('/', favoritesController.createFavorite);
favoritesRouter.put('/:id', favoritesController.updateFavorite);
favoritesRouter.delete('/:id', favoritesController.deleteFavorite);

module.exports = favoritesRouter;