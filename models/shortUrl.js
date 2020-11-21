const mongoose = require('mongoose');
const shortener = require('../scripts/scripts');

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: () => shortener()
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);