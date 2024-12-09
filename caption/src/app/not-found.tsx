import Link from 'next/link'

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-8">
        <h1 className="text-9xl font-bold text-purple-600">404</h1>
        <h2 className="text-4xl font-semibold">Page Not Found</h2>
        <p className="text-xl text-gray-400 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Go Home
          </Link>
          <p className="text-sm text-gray-500">
            If you think this is a mistake, please{' '}
            <Link href="/contact" className="text-purple-400 hover:underline">
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}