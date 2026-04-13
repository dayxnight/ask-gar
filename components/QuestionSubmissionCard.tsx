'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function QuestionSubmissionCard({ userId }: { userId: string }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()
  const maxChars = 500

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim()) {
      setError('Please enter a question')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error: insertError } = await supabase
        .from('questions')
        .insert({
          user_id: userId,
          question_text: text.trim(),
          is_public: true,
        })

      if (insertError) throw insertError

      setText('')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to submit question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <label className="block">
        <p className="text-sm font-medium text-foreground mb-2">Ask a Question</p>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setError('')
          }}
          placeholder="What would you like to ask..."
          maxLength={maxChars}
          rows={3}
          className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
        />
      </label>

      <div className="flex items-center justify-between">
        <span className={`text-xs ${text.length > maxChars * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
          {text.length} / {maxChars}
        </span>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Question'}
      </button>
    </form>
  )
}
