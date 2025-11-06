const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    synopsis: { type: String, required: false },
    category: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: String, required: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    publishDate: { type: Date, required: true, default: Date.now },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

bookSchema.virtual('averageScore').get(function() {
    if (this.reviews && this.reviews.length > 0) {
        const totalScore = this.reviews.reduce((acc, review) => acc + review.score, 0);
        return totalScore / this.reviews.length;
    }
    return 0;
});

module.exports = mongoose.model("Book", bookSchema);