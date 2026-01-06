const { body } = require('express-validator')

const validateQuestion = [
  body('question')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Question must be between 5 and 500 characters'),
]

const validateAnswer = [
  body('answer')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Answer must be between 1 and 1000 characters'),
]

const validateImageUpload = [
  body('caption')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Caption must be less than 200 characters'),
]

module.exports = {
  validateQuestion,
  validateAnswer,
  validateImageUpload,
}
