const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String, // store image filename
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
