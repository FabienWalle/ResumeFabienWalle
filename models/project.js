const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    description: {
        type: String,
        required: [true, "pas de description"],
    },
    technologies: {
        type: String,
        required: [true, "pas de technologies"]
    },
    image: {
        type: String,
        required: [true, "pas d'image"],
    },
    url: {
        type: String,
        required: [true, "pas d'URL"],
    }
})

const projectModel = mongoose.model('projects', projectSchema);
module.exports = projectModel;