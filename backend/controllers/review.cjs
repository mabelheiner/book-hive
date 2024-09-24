const Review = require('../models/review.cjs')

const getAll = async (req, res) => {
    const reviews = await Review.find({});
    res.setHeader('Content-Type', 'application/json');
    res.json(reviews)
}

const getSingle = async (req, res) => {
    const reviews = await Review.findById(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.json(reviews);
}

const createReview = async (req, res) => {
    const review = {
        userId: req.body.userId,
        bookId: req.body.bookId,
        rating: req.body.rating,
        text: req.body.text
    }
    const newReview = new Review(review);
    await newReview.save();
    res.json(newReview);
}

const updateReview = async (req, res) => {
    const review = {
        userId: req.body.userId,
        bookId: req.body.bookId,
        rating: req.body.rating,
        text: req.body.text
    }
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, review, {new: true})
    res.json(updatedReview);
}

const deleteReview = async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.json({message: 'Review deleted successfully.'})
}

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview
}