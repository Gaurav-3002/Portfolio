'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      color: string
    }> = []

    // Create particles - 10% more for density
    for (let i = 0; i < 165; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        alpha: Math.random() * 0.7 + 0.3, // Slightly higher alpha for visibility
        color: Math.random() > 0.5 ? '#6366f1' : '#8b5cf6'
      })
    }

    let mouseX = 0
    let mouseY = 0

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += dx * force * 0.0005
          particle.vy += dy * force * 0.0005
        }

        // Boundaries
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // Draw connections - denser and darker
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 110) { // Increased for density
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - distance / 110)})` // Darker
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Octahedron */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 rotate-45"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        animate={{
          rotate: [45, 405],
          scale: [1, 1.2, 1],
          x: [0, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Dodecahedron */}
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-full"
        animate={{
          rotate: [0, 360],
          y: [0, -25, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Tech Icons */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-blue-400/30 rounded-full"
        animate={{
          rotate: [0, 360],
          y: [0, -15, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-purple-50/30 pointer-events-none" />
    </div>
  )
}

export default AnimatedBackground