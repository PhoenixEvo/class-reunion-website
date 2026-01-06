const express = require('express')
const router = express.Router()
const { getQuestions, createQuestion, addAnswer } = require('../controllers/questionController')
const { validateQuestion, validateAnswer } = require('../middlewares/validation')

// GET /api/questions - Get all questions
router.get('/', getQuestions)

// POST /api/questions - Create new question
router.post('/', validateQuestion, createQuestion)

// POST /api/questions/:id/answers - Add answer to question
router.post('/:id/answers', validateAnswer, addAnswer)

module.exports = router
