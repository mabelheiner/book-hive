const Favorite = require('../models/favorite.cjs');

const getAll = async (req, res) => {
    const favorites = await Book.find();
    res.setHeader('Content-Type', 'application/json')
}

const getSingle = async (req, res) => {
    const favorites = await Favorite.findById(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.json(favorites);
}

const createFavorite = async (req, res) => {
    const favorite = {
        userId: req.body.userId,
        bookId: req.body.bookId
    }
    const newFavorite = new Favorite(favorite);
    await newFavorite.save();
    res.json(newFavorite);
}

const updateFavorite = async (req, res) => {
    const favorite = {
        userId: req.body.userId,
        bookId: req.body.userId
    }
    const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, favorite, {new: true})
    res.json(updatedFavorite);
}

const deleteFavorite = async (req, res) => {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({message: 'Favorite removed.'})
}

module.exports = {
    getAll,
    getSingle,
    createFavorite,
    updateFavorite,
    deleteFavorite
}