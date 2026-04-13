import Link from 'next/link'

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl">
            ⚠
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Error</h1>
          {searchParams?.message && (
            <p className="text-gray-600">{searchParams.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Link href="/" className="block btn btn-primary">
            Back to Home
          </Link>
          <Link href="/auth/login" className="block btn btn-secondary">
            Try Again
          </Link>
        </div>
      </div>
    </main>
  )
}
