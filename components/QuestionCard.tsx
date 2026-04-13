'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  question_text: string
  answer_text: string | null
  is_answered: boolean
  created_at: string
  user_id: string
}

export default function QuestionCard({
  question,
  onShare,
}: {
  question: Question
  onShare: (question: Question) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [answerText, setAnswerText] = useState(question.answer_text || '')
  const [editingAnswer, setEditingAnswer] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSaveAnswer = async () => {
    if (!answerText.trim()) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('questions')
        .update({
          answer_text: answerText.trim(),
          is_answered: true,
          answered_at: new Date().toISOString(),
        })
        .eq('id', question.id)

      if (error) throw error
      setEditingAnswer(false)
      router.refresh()
    } catch (err: any) {
      console.error('Failed to save answer:', err)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="card">
      {/* Question Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left hover:opacity-75 transition flex items-start gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              question.is_answered
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {question.is_answered ? '✓ Answered' : 'Unanswered'}
            </span>
            <span className="text-xs text-gray-500">{formatDate(question.created_at)}</span>
          </div>
          <p className="text-foreground font-medium line-clamp-2 break-words">
            {question.question_text}
          </p>
        </div>
        <span className="text-primary text-xl flex-shrink-0">
          {expanded ? '−' : '+'}
        </span>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 space-y-4 pt-4 border-t border-border">
          {/* Answer Display or Edit */}
          {editingAnswer ? (
            <>
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Write your answer..."
                rows={4}
                className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveAnswer}
                  disabled={saving || !answerText.trim()}
                  className="flex-1 btn btn-primary disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Answer'}
                </button>
                <button
                  onClick={() => {
                    setEditingAnswer(false)
                    setAnswerText(question.answer_text || '')
                  }}
                  className="flex-1 btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : question.is_answered ? (
            <>
              <div className="bg-primary_light rounded-lg p-4">
                <p className="text-foreground whitespace-pre-wrap break-words">
                  {answerText}
                </p>
              </div>
              <button
                onClick={() => setEditingAnswer(true)}
                className="btn btn-secondary w-full"
              >
                Edit Answer
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditingAnswer(true)}
              className="btn btn-primary w-full"
            >
              Write Answer
            </button>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <button
              onClick={() => onShare(question)}
              className="flex-1 btn btn-secondary text-sm"
            >
              Share
            </button>
            <button className="flex-1 btn btn-secondary text-sm">
              More...
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
