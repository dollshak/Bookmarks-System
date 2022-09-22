const mongoose = require('mongoose');

const BookmarkScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    task:{
        type: String,
        required: false
    }
}); 

module.exports = mongoose.model('Bookmarks', BookmarkScheme);