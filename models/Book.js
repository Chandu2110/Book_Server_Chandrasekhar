const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookName: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ['AVAILABLE', 'SOLD'] },
});

module.exports = mongoose.model('Book', BookSchema);
