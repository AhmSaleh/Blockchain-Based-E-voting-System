const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', mongoose.Schema({
    nationalID: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 200,
        default: '^&^$%^#^%^*&^*&@&^#@^%#*&^$%^&#'
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        minlength: 6,
        maxlength: 200,
        default:'!@#$%'
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        nationalID: Joi.string().required(),
        password: Joi.string().min(6).max(200),
        isRegistered: Joi.bool(),
        email: Joi.string().min(6).max(200)
    });
    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;