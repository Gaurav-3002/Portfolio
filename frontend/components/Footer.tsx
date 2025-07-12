'use client'

import { motion } from 'framer-motion'
import { Heart, Code, Coffee } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative mt-20 py-12 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="glass-effect rounded-3xl p-8 text-center">
          <div className="space-y-6">
            {/* Main Text */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold gradient-text">
                Thanks for visiting!
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                This portfolio was crafted with passion and attention to detail. 
                Feel free to explore the code and reach out if you have any questions.
              </p>
            </div>

            {/* Made with Love */}
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <span>using</span>
              <Code className="w-5 h-5 text-blue-500" />
              <span>and</span>
              <Coffee className="w-5 h-5 text-amber-600" />
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Next.js 15
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                TypeScript
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Three.js
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Framer Motion
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                Tailwind CSS
              </span>
            </div>

            {/* Copyright */}
            <div className="pt-6 border-t border-slate-200">
              <p className="text-slate-500 text-sm">
                © {currentYear} Gaurav Kumar. All rights reserved.
              </p>
            </div>

            {/* Animated Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer