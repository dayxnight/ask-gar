'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Question {
  id: string
  question_text: string
  answer_text: string | null
  is_answered: boolean
  created_at: string
  user_id: string
}

export default function ShareModal({
  question,
  onClose,
}: {
  question: Question
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/question/${question.id}`
  const shareText = `Check out this Q&A: "${question.question_text}"`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)

      // Log share event
      await supabase.from('shares').insert({
        question_id: question.id,
        share_platform: 'copy_link',
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleNativeShare = async () => {
    if (!navigator.share) return

    try {
      await navigator.share({
        title: 'Ask GAR',
        text: shareText,
        url: shareUrl,
      })

      // Log share event
      await supabase.from('shares').insert({
        question_id: question.id,
        share_platform: 'native_share',
      })
    } catch (err) {
      console.error('Share failed:', err)
    }
  }

  const shareOptions = [
    {
      id: 'copy',
      label: 'Copy Link',
      icon: '🔗',
      action: handleCopyLink,
      show: true,
    },
    {
      id: 'native',
      label: 'Share',
      icon: '↗️',
      action: handleNativeShare,
      show: typeof navigator !== 'undefined' && !!navigator.share,
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: '𝕏',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        window.open(url, '_blank')
        supabase.from('shares').insert({
          question_id: question.id,
          share_platform: 'twitter',
        })
      },
      show: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: '💬',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText)} ${shareUrl}`
        window.open(url, '_blank')
        supabase.from('shares').insert({
          question_id: question.id,
          share_platform: 'whatsapp',
        })
      },
      show: true,
    },
  ]

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl animate-in slide-in-from-bottom-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Share Question</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-foreground text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Question Preview */}
          <div className="px-4 sm:px-6 py-4 bg-primary_light rounded-lg mx-4 sm:mx-6 my-4">
            <p className="text-foreground break-words text-sm line-clamp-3">
              {question.question_text}
            </p>
            {question.answer_text && (
              <>
                <p className="text-xs text-gray-600 mt-2">Answer:</p>
                <p className="text-foreground break-words text-sm line-clamp-2 mt-1">
                  {question.answer_text}
                </p>
              </>
            )}
          </div>

          {/* Share Options Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 sm:p-6">
            {shareOptions.map((option) =>
              option.show ? (
                <button
                  key={option.id}
                  onClick={option.action}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-primary_light hover:bg-border transition min-h-20"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm font-medium text-foreground">
                    {option.id === 'copy' && copied ? 'Copied!' : option.label}
                  </span>
                </button>
              ) : null
            )}
          </div>

          {/* URL Copy Section */}
          <div className="px-4 sm:px-6 pb-4">
            <p className="text-xs text-gray-600 mb-2">Share URL:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-primary_light border border-border rounded-lg text-xs text-gray-600 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-accent transition"
              >
                {copied ? '✓' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 border-t border-border text-foreground font-medium hover:bg-primary_light transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}
