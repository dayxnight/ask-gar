'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Navigation from '@/components/Navigation'
import QuestionSubmissionCard from '@/components/QuestionSubmissionCard'
import QuestionFeed from '@/components/QuestionFeed'
import InboxView from '@/components/InboxView'
import ShareModal from '@/components/ShareModal'

type TabType = 'questions' | 'inbox' | 'shared'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('questions')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [shareQuestion, setShareQuestion] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary_light animate-pulse mx-auto mb-4"></div>
          <p className="text-primary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
              ?
            </div>
            <h1 className="text-2xl font-bold text-foreground">Ask GAR</h1>
            <p className="text-sm text-gray-600">Anonymous Q&A</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-primary_light rounded-xl p-1">
          {(['questions', 'inbox', 'shared'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-accent hover:text-primary'
              }`}
            >
              {tab === 'questions' && 'Questions'}
              {tab === 'inbox' && 'Inbox'}
              {tab === 'shared' && 'Shared'}
            </button>
          ))}
        </div>

        {/* Content by Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            {user ? (
              <>
                <QuestionSubmissionCard userId={user.id} />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">My Questions</h2>
                  <QuestionFeed
                    userId={user.id}
                    onShare={(question) => setShareQuestion(question)}
                  />
                </div>
              </>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">Sign in to view and submit questions</p>
                <a
                  href="/auth/login"
                  className="inline-block btn btn-primary"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'inbox' && (
          <div>
            {user ? (
              <>
                <h2 className="text-lg font-semibold text-foreground mb-4">Questions for You</h2>
                <InboxView
                  userId={user.id}
                  onShare={(question) => setShareQuestion(question)}
                />
              </>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">Sign in to view incoming questions</p>
                <a
                  href="/auth/login"
                  className="inline-block btn btn-primary"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'shared' && (
          <div>
            {user ? (
              <>
                <h2 className="text-lg font-semibold text-foreground mb-4">Your Shared Answers</h2>
                <p className="text-gray-600 text-center py-12">No shared answers yet</p>
              </>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">Sign in to track shared answers</p>
                <a
                  href="/auth/login"
                  className="inline-block btn btn-primary"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareQuestion && (
        <ShareModal
          question={shareQuestion}
          onClose={() => setShareQuestion(null)}
        />
      )}

      {/* Mobile Navigation */}
      <Navigation user={user} />
    </main>
  )
}
