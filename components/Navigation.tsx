'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Navigation({ user }: { user: any }) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    setShowMenu(false)
  }

  return (
    <>
      {/* Bottom Fixed Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
        <div className="max-w-2xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          <button className="flex flex-col items-center py-2 px-4 text-primary font-medium">
            <span className="text-2xl mb-1">?</span>
            <span className="text-xs">Ask</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary">
            <span className="text-2xl mb-1">👤</span>
            <span className="text-xs">Profile</span>
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex flex-col items-center py-2 px-4 text-gray-500 hover:text-primary relative"
          >
            <span className="text-2xl mb-1">≡</span>
            <span className="text-xs">Menu</span>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute bottom-full right-0 w-48 bg-white rounded-xl border border-border shadow-lg mb-2">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push('/profile')}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-primary_light rounded-lg"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => router.push('/settings')}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-primary_light rounded-lg"
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/auth/login"
                      className="block px-4 py-3 text-sm hover:bg-primary_light rounded-lg"
                    >
                      Sign In
                    </a>
                    <a
                      href="/auth/sign-up"
                      className="block px-4 py-3 text-sm hover:bg-primary_light rounded-lg"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Overlay when menu is open */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  )
}
