const mongoose = require('mongoose');

const Users = mongoose.Schema({
    name: String,
    age: Number,
})

const User = mongoose.model('User', Users);

module.exports = User;