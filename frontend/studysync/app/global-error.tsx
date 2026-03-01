'use client'

import { CloudSlashIcon } from "@phosphor-icons/react"
import "./globals.css" 
import { Source_Sans_3 } from "next/font/google"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
})

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // Add the font class here
    <html lang="en" className={sourceSans.className}>
      <body className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-6">
          <div className="flex justify-center mb-4 text-red-500">
            <CloudSlashIcon weight="light" size={"100px"} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Server Unreachable</h1>
          <p className="text-gray-500 mt-2 mb-8 max-w-xs mx-auto">
            We couldn't connect to StudySync. Please check your connection and try again.
          </p>
          <button 
            onClick={() => reset()}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}