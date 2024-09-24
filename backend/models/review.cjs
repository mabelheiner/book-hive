const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    bookId: {type: String, required: true},
    rating: {type: Number, required: true},
    text: {type: String, required: true}
}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;