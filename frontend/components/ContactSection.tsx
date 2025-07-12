'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [currentTime, setCurrentTime] = useState('--:-- --') // Default placeholder to avoid hydration mismatch

  // Update time only on client side
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes.toString().padStart(2, '0')
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`)
    }

    // Update immediately and then every minute
    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // EmailJS configuration - these would be environment variables in production
      const serviceID = 'service_portfolio'
      const templateID = 'template_contact'
      const publicKey = 'your_public_key_here'
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Gaurav Kumar',
      }
      
      // For demo purposes, we'll simulate the email sending
      // In production, you would uncomment this line:
      // await emailjs.send(serviceID, templateID, templateParams, publicKey)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitting(false)
      setSubmitStatus('success')
      
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
      
    } catch (error) {
      console.error('EmailJS Error:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Clock,
      label: 'Current Time',
      value: currentTime, // Now using state that updates only on client
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'gauravkrbkj@gmail.com',
      color: 'text-purple-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(+91) 8252589763',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bhubaneswar, India',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="glass-effect rounded-3xl p-8 lg:p-12 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
          Get In Touch
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Let's Connect
            </h3>
            <p className="text-slate-600 mb-8">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-medium">{item.label}</div>
                  <div className="text-slate-800 font-semibold">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="pt-8 border-t border-slate-200">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">
              Follow me on social media
            </h4>
            <div className="flex gap-4">
              {[
                { name: 'LinkedIn', color: 'bg-blue-600', icon: 'in' },
                { name: 'GitHub', color: 'bg-gray-800', icon: 'gh' },
                { name: 'Twitter', color: 'bg-blue-400', icon: 'tw' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg`}
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tell me about your project or just say hello!"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-xl"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Failed to send message. Please try again later.</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactSection