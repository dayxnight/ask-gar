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

export default function QuestionFeed({
  userId,
  onShare,
}: {
  userId: string
  onShare: (question: Question) => void
}) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('questions')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        setQuestions(data || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load questions')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [userId, supabase])

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

  if (questions.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600 mb-4">No questions yet</p>
        <p className="text-sm text-gray-500">Start by asking your first question above</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onShare={onShare}
        />
      ))}
    </div>
  )
}
