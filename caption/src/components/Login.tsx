"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Jaro } from 'next/font/google'
import axios from "axios"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import Link from "next/link"

const jaro = Jaro({ subsets: ["latin"] })

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post("/api/auth/login", formData)
      console.log("Login successful:", response.data)
      // Redirect to home page or dashboard
      router.push("/")
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "An error occurred during login.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={`flex min-h-screen flex-col items-center gap-14 bg-black px-4 sm:px-6 lg:px-8 ${jaro.className}`}>
      <p className="text-3xl sm:text-3xl font-bold text-white mt-8"
            style={{ 
              WebkitTextStroke: "0.25px #8E2DE2",
            }}>AI Caption Generator</p>
      <div className="w-full max-w-[380px] space-y-6 rounded-xl bg-zinc-900 p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="text-center">
          <h2 
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ 
              WebkitTextStroke: "0.25px #8E2DE2",
            }}
          >
            Log in to your account
          </h2>
        </div>
        {error && (
          <div className="text-red-500 text-sm sm:text-base text-center">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-white text-sm sm:text-base mb-1">
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="pl-10 h-11 w-full bg-zinc-800 text-white border border-zinc-700 focus:border-[#8E2DE2] focus:ring-1 focus:ring-[#8E2DE2] text-sm sm:text-base rounded-lg"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-sm sm:text-base mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="pl-10 pr-10 h-11 w-full bg-zinc-800 text-white border border-zinc-700 focus:border-[#8E2DE2] focus:ring-1 focus:ring-[#8E2DE2] text-sm sm:text-base rounded-lg"
                required
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-sm sm:text-base" />
                ) : (
                  <FaEye className="text-sm sm:text-base" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-11 bg-[#8E2DE2] hover:bg-[#7B25C3] text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8E2DE2] focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <div className="text-center mt-4">
        <p className="text-zinc-400 text-sm sm:text-base">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-[#8E2DE2] hover:text-[#7B25C3] font-semibold">
            Sign up
          </Link>
        </p>
      </div>
      </div>
    </div>
  )
}

