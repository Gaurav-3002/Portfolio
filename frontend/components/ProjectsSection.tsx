'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, Star, Clock, Tag, Code, Zap, Eye } from 'lucide-react'
import Image from 'next/image'
import projectsData from '../data/projects.json'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative card-hover ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-white/20 hover:bg-white transition-all duration-300 h-full">
        {/* Project Image with Overlay */}
        <div className="relative overflow-hidden">
          <div className={`aspect-video ${project.featured ? 'lg:aspect-[2/1]' : ''} bg-gradient-to-br from-slate-100 to-slate-200`}>
            {!imageLoaded && (
              <div className="w-full h-full skeleton"></div>
            )}
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={400}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Modern Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <a
                  href={project.liveUrl}
                  className="group/btn flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl font-semibold text-slate-800 hover:bg-white transition-all duration-300 hover:scale-105"
                  aria-label="View live project"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Live</span>
                </a>
                <a
                  href={project.githubUrl}
                  className="group/btn flex items-center gap-2 px-6 py-3 bg-slate-900/90 backdrop-blur-sm rounded-xl font-semibold text-white hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                  aria-label="View source code"
                >
                  <Code className="w-4 h-4" />
                  <span>Source</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              <Star className="w-4 h-4 fill-current" />
              Featured
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-slate-800 flex-1">
              {project.title}
            </h3>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>

          <p className="text-slate-600 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies with improved styling */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full text-sm font-medium hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Links - Always visible */}
          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectsSection = () => {
  const [filter, setFilter] = useState('all')
  const projects = projectsData.projects

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
    { id: 'recent', label: 'Recent', count: projects.slice(0, 3).length },
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
    ? projects.filter(p => p.featured)
    : projects.slice(0, 3)

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
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A showcase of my recent work, featuring innovative solutions and cutting-edge technologies 
          that demonstrate my passion for creating exceptional user experiences.
        </p>
      </motion.div>

      {/* Enhanced Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {filters.map((filterItem) => (
          <motion.button
            key={filterItem.id}
            onClick={() => setFilter(filterItem.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === filterItem.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filterItem.label}
            <span className="ml-2 text-sm opacity-75">({filterItem.count})</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Enhanced CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                <Github className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Want to see more projects?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Check out my GitHub profile for more repositories, open-source contributions, 
              and experimental projects.
            </p>
            <motion.a
              href="https://github.com/gauravkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectsSection