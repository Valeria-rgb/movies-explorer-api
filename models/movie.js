const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: (props) => `${props.value} поле 'image' должно быть валидным url-адресом!`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: (props) => `${props.value} поле 'trailer' должно быть валидным url-адресом!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: (props) => `${props.value} поле 'thumbnail' должно быть валидным url-адресом!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
