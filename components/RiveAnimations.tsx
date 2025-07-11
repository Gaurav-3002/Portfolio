'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const RiveAnimations = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // This is a placeholder for Rive animation
    // In a real implementation, you would load the Rive file here
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Placeholder for Rive Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden">
        {/* Animated Avatar Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Avatar Container */}
            <div className="relative w-64 h-64 bg-white/90 rounded-full shadow-2xl flex items-center justify-center">
              {/* Avatar Face */}
              <div className="relative w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                {/* Eyes */}
                <div className="absolute top-16 left-12 w-6 h-6 bg-white rounded-full">
                  <motion.div
                    className="w-4 h-4 bg-slate-800 rounded-full m-1"
                    animate={{ x: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="absolute top-16 right-12 w-6 h-6 bg-white rounded-full">
                  <motion.div
                    className="w-4 h-4 bg-slate-800 rounded-full m-1"
                    animate={{ x: [0, -2, 0, 2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                
                {/* Mouth */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-full"></div>
                
                {/* Glasses */}
                <div className="absolute top-14 left-8 right-8 h-12 border-4 border-white rounded-full opacity-80"></div>
                <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
              </div>
              
              {/* Hand Wave */}
              <motion.div
                className="absolute -right-4 top-20 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
                animate={{ 
                  rotate: [0, 20, -20, 20, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-400 rounded-full"
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -180, -360] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute top-1/2 -left-8 w-4 h-4 bg-green-400 rounded-full"
              animate={{ 
                x: [0, -20, 0],
                scale: [1, 1.5, 1] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
        
        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/90 rounded-3xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Loading animation...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RiveAnimations