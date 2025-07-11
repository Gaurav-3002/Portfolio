'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const HumanoidImage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main humanoid image */}
      <motion.div
        className="relative w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image
          src="/humanoid.png"
          alt="Product Designer"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Cursor-following color flow effect */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {/* Flowing color circles */}
          <div className="relative w-full h-full">
            <motion.div
              className="absolute w-4 h-4 bg-blue-500 rounded-full"
              animate={{
                x: [0, 20, -10, 15, -5],
                y: [0, -15, 10, -20, 5],
                opacity: [0.8, 0.6, 0.9, 0.4, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-6 h-6 bg-purple-500 rounded-full"
              animate={{
                x: [0, -20, 15, -10, 25],
                y: [0, 10, -20, 15, -5],
                opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute w-3 h-3 bg-cyan-400 rounded-full"
              animate={{
                x: [0, 10, -25, 20, -15],
                y: [0, -25, 5, -10, 20],
                opacity: [0.9, 0.4, 0.7, 0.9, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute w-5 h-5 bg-pink-500 rounded-full"
              animate={{
                x: [0, -15, 30, -20, 10],
                y: [0, 20, -15, 25, -10],
                opacity: [0.7, 0.8, 0.4, 0.6, 0.9],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default HumanoidImage