'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Calendar, Award, Users } from 'lucide-react'
import Image from 'next/image'
import certificationsData from '../data/certifications.json'

interface Certification {
  id: number
  title: string
  description: string
  platform: string
  platformLogo: string
  iconUrl: string
  year: string
  skills: string[]
  certificateUrl: string
  brandColor: string
}

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group card-hover"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 hover:bg-white transition-all duration-300 h-full">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Certificate Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            {!logoLoaded && !logoError && (
              <div className="w-full h-full skeleton rounded-2xl"></div>
            )}
            
            {logoError ? (
              <div 
                className="w-full h-full rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: cert.brandColor }}
              >
                <Award className="w-8 h-8" />
              </div>
            ) : (
              <Image
                src={cert.iconUrl}
                alt={`${cert.title} certificate`}
                width={40}
                height={40}
                className={`w-10 h-10 object-contain transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLogoLoaded(true)}
                onError={() => setLogoError(true)}
              />
            )}
          </div>

          {/* Certificate Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
              {cert.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Image
                src={cert.platformLogo}
                alt={cert.platform}
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <span>{cert.platform}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{cert.year}</span>
              </div>
            </div>
          </div>

          {/* Year Badge */}
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: cert.brandColor }}
          >
            {cert.year}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 mb-4">
          {cert.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cert.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* View Certificate Button */}
        <a
          href={cert.certificateUrl}
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
        >
          <ExternalLink className="w-4 h-4" />
          View Certificate
        </a>

        {/* Flow Line Animation */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <motion.div
            initial={{ x: '-100%' }}
            whileInView={{ x: '100%' }}
            transition={{ duration: 2, delay: index * 0.1 + 0.5 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ width: '50%' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

const CertificationsSection = () => {
  const certifications = certificationsData.certifications

  const stats = [
    {
      icon: Award,
      value: certifications.length,
      label: 'Certifications',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      value: new Set(certifications.map(c => c.platform)).size,
      label: 'Platforms',
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      value: new Set(certifications.map(c => c.year)).size,
      label: 'Years',
      color: 'text-green-600'
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
          Certifications & Achievements
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Professional certifications and achievements that validate my expertise and commitment to continuous learning.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white/80 rounded-2xl">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mb-4">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <CertificationCard key={cert.id} cert={cert} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Continuous Learning Journey
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            I believe in continuous learning and regularly update my skills through courses, 
            workshops, and hands-on projects. Stay tuned for more certifications!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Currently Learning: Next.js 15</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Next Goal: AWS Cloud Practitioner</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CertificationsSection