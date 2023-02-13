const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, 'Pas de login'],
    },
    password: {
        type: String,
        required: [true, "pas de mot de passe"],
    },
})

const loginModel = mongoose.model('login', loginSchema);
module.exports = loginModel;