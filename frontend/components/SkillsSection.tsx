'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import skillsData from '@/data/skills.json'

interface Skill {
  name: string
  category: string
  proficiency: number
  logoUrl: string
  brandColor: string
  description: string
}

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const rotationClasses = [
    'skill-card-rotate-1',
    'skill-card-rotate-2',
    'skill-card-rotate-3',
    'skill-card-rotate-4',
    'skill-card-rotate-5',
    'skill-card-rotate-6',
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'from-blue-500 to-cyan-500'
      case 'backend':
        return 'from-green-500 to-emerald-500'
      case 'database':
        return 'from-purple-500 to-violet-500'
      case 'devops':
        return 'from-orange-500 to-red-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-100 text-blue-700'
      case 'backend':
        return 'bg-green-100 text-green-700'
      case 'database':
        return 'bg-purple-100 text-purple-700'
      case 'devops':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative group card-hover ${rotationClasses[index % rotationClasses.length]}`}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white transition-all duration-300">
        {/* Category Badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${getCategoryBadgeColor(skill.category)}`}>
          {skill.category}
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center mb-4 relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
            {!logoLoaded && !logoError && (
              <div className="w-full h-full skeleton rounded-2xl"></div>
            )}
            
            {logoError ? (
              <div 
                className={`w-full h-full rounded-2xl bg-gradient-to-br ${getCategoryColor(skill.category)} flex items-center justify-center`}
              >
                <span className="text-white font-bold text-lg">
                  {skill.name.charAt(0)}
                </span>
              </div>
            ) : (
              <Image
                src={skill.logoUrl}
                alt={`${skill.name} logo`}
                width={40}
                height={40}
                className={`w-10 h-10 object-contain transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLogoLoaded(true)}
                onError={() => setLogoError(true)}
              />
            )}
          </div>
        </div>

        {/* Skill Name */}
        <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 text-center mb-4">
          {skill.description}
        </p>

        {/* Proficiency */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">Proficiency</span>
            <span className="text-sm font-bold text-slate-800">{skill.proficiency}%</span>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-2 relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
              className={`h-full rounded-full bg-gradient-to-r ${getCategoryColor(skill.category)}`}
            />
          </div>
        </div>

        {/* Flow Line Animation */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            initial={{ x: '-100%' }}
            whileInView={{ x: '100%' }}
            transition={{ duration: 2, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ width: '50%' }}
          />
        </div>

        {/* Brand Color Accent */}
        <div 
          className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-60"
          style={{ backgroundColor: skill.brandColor }}
        />
      </div>
    </motion.div>
  )
}

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const skills = skillsData.skills

  const categories = [
    { id: 'all', label: 'All Skills', count: skills.length },
    { id: 'frontend', label: 'Frontend', count: skills.filter(s => s.category === 'frontend').length },
    { id: 'backend', label: 'Backend', count: skills.filter(s => s.category === 'backend').length },
    { id: 'database', label: 'Database', count: skills.filter(s => s.category === 'database').length },
    { id: 'devops', label: 'DevOps', count: skills.filter(s => s.category === 'devops').length },
  ]

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

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
          Skills & Technologies
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A comprehensive collection of technologies and tools I've mastered through hands-on experience and continuous learning.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md'
            }`}
          >
            {category.label}
            <span className="ml-2 text-sm opacity-75">({category.count})</span>
          </button>
        ))}
      </motion.div>

      {/* Skills Grid - Masonry Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {skills.filter(s => s.category === 'frontend').length}
            </div>
            <div className="text-sm text-blue-700 font-medium">Frontend</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {skills.filter(s => s.category === 'backend').length}
            </div>
            <div className="text-sm text-green-700 font-medium">Backend</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {skills.filter(s => s.category === 'database').length}
            </div>
            <div className="text-sm text-purple-700 font-medium">Database</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {skills.filter(s => s.category === 'devops').length}
            </div>
            <div className="text-sm text-orange-700 font-medium">DevOps</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SkillsSection