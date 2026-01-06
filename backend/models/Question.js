const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    trim: true,
    default: 'Ẩn danh',
  },
  answers: [answerSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Question', questionSchema)
