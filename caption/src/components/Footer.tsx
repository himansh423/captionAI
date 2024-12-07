"use client"

import { Jaro } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'

const jaro = Jaro({ subsets: ['latin'] })

const Footer = () => {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState<string | null>(null)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setLogoutError(null)

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/login')
      } else {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      setLogoutError('Failed to logout. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <footer className="bg-black text-white border-t border-[#8E2DE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link href="/privacy-policy" className="hover:text-[#8E2DE2] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#8E2DE2] transition-colors">
              Terms and Conditions
            </Link>
          </div>
          
        </div>
        {logoutError && (
          <div className="mt-4 text-red-500 text-center">{logoutError}</div>
        )}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Booleanix - AI Caption Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer