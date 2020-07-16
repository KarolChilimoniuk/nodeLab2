const mongoose = require('mongoose');

module.exports = mongoose.model('ads', {
    advert: String,
    categories: [],
    price: String,
    date: Date,
    username: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
    },
});