'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, User, ArrowRight, Download, Mail, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const ProfileIntro = () => {
  const [copied, setCopied] = useState(false)
  const email = "gauravkrbkj121@gmail.com"

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Gaurav_Resume.pdf'
    link.click()
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[80vh]">
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full max-w-4xl mx-auto">
        {/* Profile Pic & Socials */}
        <div className="flex flex-col items-center md:w-1/3 relative">
          <div className="w-80 h-80 bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl" style={{ clipPath: 'polygon(50% 0%, 90% 20%, 90% 80%, 50% 100%, 10% 80%, 10% 20%)', borderRadius: '3rem' }}>
            <img
              src="/Self.jpg"
              alt="Gaurav Kumar - Profile"
              className="w-full h-full object-cover"
              style={{ clipPath: 'polygon(50% 0%, 90% 20%, 90% 80%, 50% 100%, 10% 80%, 10% 20%)', borderRadius: '3rem', border: 'none', objectPosition: 'center 60%' }}
            />
          </div>
          {/* Social Buttons - vertical, aligned right of hexagon */}
          <div className="hidden md:flex flex-col gap-4 absolute top-1/2 right-0 -translate-y-1/2 translate-x-full">
            <a href="https://github.com/gauravkumar" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-all" aria-label="GitHub">
              <svg width="24" height="24" fill="#181717" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/gauravkumar" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-all" aria-label="LinkedIn">
              <svg width="24" height="24" fill="#0077B5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" /></svg>
            </a>
            <a href="https://twitter.com/gauravkumar" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-all" aria-label="Twitter">
              <svg width="24" height="24" fill="#1DA1F2" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" /></svg>
            </a>
          </div>
          {/* Mobile: horizontal below hexagon */}
          <div className="flex md:hidden gap-3 mt-4">
            <a href="https://github.com/gauravkumar" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-all" aria-label="GitHub">
              <svg width="20" height="20" fill="#181717" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/gauravkumar" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-all" aria-label="LinkedIn">
              <svg width="20" height="20" fill="#0077B5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" /></svg>
            </a>
            <a href="https://twitter.com/gauravkumar" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-all" aria-label="Twitter">
              <svg width="20" height="20" fill="#1DA1F2" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" /></svg>
            </a>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-slate-800 dark:text-white">
            <span className="block text-base lg:text-lg font-medium text-slate-500 dark:text-slate-300 mb-1">Hey I'm</span>
            <span className="block gradient-text text-4xl lg:text-6xl font-extrabold">Gaurav</span>
          </h1>
          <h2 className="text-lg lg:text-2xl font-semibold text-slate-700 dark:text-slate-300">
            Aspiring Software Developer
          </h2>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2 mx-auto md:mx-0">
            <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">{email}</span>
            <button
              onClick={copyEmail}
              className="ml-2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              )}
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Passionate software developer creating innovative solutions through cutting-edge technology. Experienced in Python, Java, SQL, and Machine Learning.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              <User className="w-5 h-5" />
              <span>About Me</span>
            </button>
            <button
              onClick={handleDownloadCV}
              className="group flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 border-2 border-slate-800 dark:border-slate-100 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-700 dark:hover:bg-slate-200 hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </button>
          </motion.div>
        </div>
      </div>
      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto"
      >
        {/* Born In */}
        <div className="space-y-2">
          <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Born in</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-lg font-semibold text-slate-800 dark:text-white">Bikramganj</span>
          </div>
        </div>
        {/* Experience */}
        <div className="space-y-2">
          <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Experience</div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span className="text-lg font-semibold text-slate-800 dark:text-white">Fresher</span>
          </div>
        </div>
        {/* Date of Birth */}
        <div className="space-y-2">
          <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date of Birth</div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-400" />
            <span className="text-lg font-semibold text-slate-800 dark:text-white">02 Nov 2004</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileIntro