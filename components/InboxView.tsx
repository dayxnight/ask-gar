'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import QuestionCard from './QuestionCard'

interface Question {
  id: string
  question_text: string
  answer_text: string | null
  is_answered: boolean
  created_at: string
  user_id: string
}

export default function InboxView({
  userId,
  onShare,
}: {
  userId: string
  onShare: (question: Question) => void
}) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all')
  const supabase = createClient()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('questions')
          .select('*')
          .eq('user_id', userId)

        if (filter === 'answered') {
          query = query.eq('is_answered', true)
        } else if (filter === 'unanswered') {
          query = query.eq('is_answered', false)
        }

        const { data, error: fetchError } = await query.order('created_at', {
          ascending: false,
        })

        if (fetchError) throw fetchError
        setQuestions(data || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load questions')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [userId, filter, supabase])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="card animate-pulse space-y-3">
            <div className="h-4 bg-primary_light rounded w-3/4"></div>
            <div className="h-4 bg-primary_light rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="card text-center py-8">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  const answered = questions.filter((q) => q.is_answered)
  const unanswered = questions.filter((q) => !q.is_answered)

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 bg-primary_light rounded-lg p-2">
        {(
          [
            { id: 'all', label: `All (${questions.length})` },
            { id: 'unanswered', label: `Unanswered (${unanswered.length})` },
            { id: 'answered', label: `Answered (${answered.length})` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition ${
              filter === tab.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-accent hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-2">No {filter !== 'all' ? filter : ''} questions</p>
          <p className="text-sm text-gray-500">
            {filter === 'unanswered'
              ? 'You&apos;re all caught up!'
              : 'Share your link to get questions from others'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  )
}
