import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

