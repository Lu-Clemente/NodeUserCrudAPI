const mongoose = require('mongoose');

const User = mongoose.model('User', {
    nickname: String,
    name: String,
    age: Number
});

module.exports = User;