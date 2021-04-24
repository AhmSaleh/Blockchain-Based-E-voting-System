const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  nationalID: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 200,
    default: "^&^$%^#^%^*&^*&@&^#@^%#*&^$%^&#",
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 200,
    default: "!@#$%",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    nationalID: Joi.string().required().length(14),
    isRegistered: Joi.bool(),
    email: Joi.string().min(6).max(200).email(),
  });
  return schema.validate(user);
}

function validatePassword(password) {
  const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 0,
    numeric: 0,
    symbol: 0,
    requirementCount: 2,
  };
  return passwordComplexity(complexityOptions).validate(password);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validatePassword = validatePassword;
