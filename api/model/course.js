let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CourseSchema = Schema({
    id: Number,
    title: String,
    teacher: String,
    course_url: String,
    teacher_url: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Course', CourseSchema);