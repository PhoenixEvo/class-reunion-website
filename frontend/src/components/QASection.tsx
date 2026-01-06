'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Send, MessageSquare } from 'lucide-react'

interface Question {
  _id: string
  question: string
  nickname?: string
  answers: Answer[]
  createdAt: string
}

interface Answer {
  _id: string
  answer: string
  createdAt: string
}

export default function QASection() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [newNickname, setNewNickname] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/questions`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestion.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newQuestion.trim(),
          nickname: newNickname.trim() || undefined
        }),
      })

      if (response.ok) {
        const newQ = await response.json()
        setQuestions(prev => [newQ, ...prev])
        setNewQuestion('')
        setNewNickname('')
      }
    } catch (error) {
      console.error('Error submitting question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitAnswer = async (questionId: string) => {
    if (!newAnswer.trim()) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: newAnswer.trim() }),
      })

      if (response.ok) {
        const updatedQuestion = await response.json()
        setQuestions(prev =>
          prev.map(q => q._id === questionId ? updatedQuestion : q)
        )
        setNewAnswer('')
        setSelectedQuestionId(null)
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-nostalgic-brown mb-4">
            Hỏi đáp ẩn danh
          </h1>
          <p className="text-nostalgic-sage text-lg">
            Chia sẻ những câu hỏi bạn từng muốn hỏi
          </p>
        </motion.div>

        {/* Submit Question Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="nostalgic-card p-6 mb-8"
        >
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-nostalgic-brown mb-2">
                Biệt danh (tùy chọn)
              </label>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="Để trống sẽ là 'Ẩn danh'"
                className="w-full px-4 py-2 border border-nostalgic-sage/30 rounded-lg focus:ring-2 focus:ring-nostalgic-warm focus:border-transparent"
                maxLength={50}
              />
              <p className="text-xs text-nostalgic-sage mt-1">
                Nếu không điền, câu hỏi sẽ hiển thị là "Ẩn danh"
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-nostalgic-brown mb-2">
                Câu hỏi của bạn
              </label>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Bạn muốn hỏi điều gì?"
                className="w-full px-4 py-3 border border-nostalgic-sage/30 rounded-lg focus:ring-2 focus:ring-nostalgic-warm focus:border-transparent resize-none"
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !newQuestion.trim()}
                className="nostalgic-button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isSubmitting ? 'Đang gửi...' : 'Gửi câu hỏi'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Questions List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nostalgic-warm"></div>
          </div>
        ) : questions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <MessageSquare className="w-16 h-16 text-nostalgic-sage/30 mx-auto mb-4" />
            <p className="text-nostalgic-brown/60 text-lg">
              Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {questions.map((question) => (
              <motion.div
                key={question._id}
                variants={itemVariants}
                className="nostalgic-card overflow-hidden"
              >
                {/* Question */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-nostalgic-brown text-lg mb-2">
                        {question.question}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-nostalgic-sage">
                        <span className="font-medium text-nostalgic-brown">
                          {question.nickname || 'Ẩn danh'}
                        </span>
                        <span>•</span>
                        <span>{formatDate(question.createdAt)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedQuestionId(
                          selectedQuestionId === question._id ? null : question._id
                        )
                      }
                      className="ml-4 p-2 hover:bg-nostalgic-sage/10 rounded-lg transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: selectedQuestionId === question._id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} className="text-nostalgic-brown" />
                      </motion.div>
                    </button>
                  </div>
                </div>

                {/* Answers */}
                <AnimatePresence>
                  {selectedQuestionId === question._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-nostalgic-sage/20"
                    >
                      <div className="p-6 space-y-4">
                        {question.answers.map((answer) => (
                          <div
                            key={answer._id}
                            className="bg-nostalgic-cream/50 rounded-lg p-4"
                          >
                            <p className="text-nostalgic-brown mb-1">
                              {answer.answer}
                            </p>
                            <p className="text-xs text-nostalgic-sage">
                              {formatDate(answer.createdAt)}
                            </p>
                          </div>
                        ))}

                        {/* Add Answer Form */}
                        <div className="border-t border-nostalgic-sage/20 pt-4">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              handleSubmitAnswer(question._id)
                            }}
                            className="space-y-3"
                          >
                            <textarea
                              value={newAnswer}
                              onChange={(e) => setNewAnswer(e.target.value)}
                              placeholder="Trả lời câu hỏi này..."
                              className="w-full px-4 py-3 border border-nostalgic-sage/30 rounded-lg focus:ring-2 focus:ring-nostalgic-warm focus:border-transparent resize-none text-sm"
                              rows={2}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedQuestionId(null)}
                                className="px-4 py-2 text-sm text-nostalgic-brown hover:bg-nostalgic-sage/10 rounded-lg transition-colors"
                              >
                                Hủy
                              </button>
                              <button
                                type="submit"
                                disabled={!newAnswer.trim()}
                                className="px-4 py-2 bg-nostalgic-warm text-white text-sm rounded-lg hover:bg-nostalgic-warm/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Trả lời
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
