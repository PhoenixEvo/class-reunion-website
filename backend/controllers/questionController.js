const Question = require('../models/Question')
const { validationResult } = require('express-validator')

// Get all questions with answers
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 })
    res.json(questions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    res.status(500).json({ error: 'Failed to fetch questions' })
  }
}

// Create new question
const createQuestion = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { question, nickname } = req.body

    const newQuestion = new Question({
      question: question.trim(),
      nickname: nickname?.trim() || 'Ẩn danh',
    })

    const savedQuestion = await newQuestion.save()
    res.status(201).json(savedQuestion)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' })
  }
}

// Add answer to question
const addAnswer = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { answer } = req.body

    const question = await Question.findById(id)
    if (!question) {
      return res.status(404).json({ error: 'Question not found' })
    }

    question.answers.push({
      answer: answer.trim(),
    })

    const updatedQuestion = await question.save()
    res.json(updatedQuestion)
  } catch (error) {
    console.error('Error adding answer:', error)
    res.status(500).json({ error: 'Failed to add answer' })
  }
}

module.exports = {
  getQuestions,
  createQuestion,
  addAnswer,
}
