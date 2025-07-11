'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Database, Globe, Zap, Heart } from 'lucide-react'

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      title: "Problem Solver",
      description: "Passionate about turning complex problems into elegant solutions through code"
    },
    {
      icon: Palette,
      title: "Creative Developer",
      description: "Combining technical skills with creative vision to build engaging experiences"
    },
    {
      icon: Database,
      title: "Data Enthusiast",
      description: "Experienced in working with various databases and data-driven applications"
    },
    {
      icon: Globe,
      title: "Full Stack",
      description: "Comfortable working across the entire technology stack"
    },
    {
      icon: Zap,
      title: "Quick Learner",
      description: "Adaptable and eager to embrace new technologies and methodologies"
    },
    {
      icon: Heart,
      title: "Team Player",
      description: "Collaborative mindset with strong communication and leadership skills"
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
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-lg text-slate-600 leading-relaxed">
            Hello! 👋 I'm <span className="font-semibold text-slate-800">Gaurav Kumar</span>, 
            a passionate and detail-oriented B.Tech Computer Science student at KIIT University, 
            Bhubaneswar. With a strong foundation in Python, Java, C, DSA, and MySQL, I thrive 
            on solving complex problems through data-driven solutions.
          </p>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Beyond coding, I enjoy playing chess, traveling, and exploring new technologies. 
            I am a quick learner with strong adaptability and problem-solving skills, eager 
            to contribute effectively in dynamic environments.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700 font-medium">Full Stack Developer</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-700 font-medium">Machine Learning</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">Open Source</span>
            </div>
          </div>
        </motion.div>

        {/* Skills Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
          <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
          <div className="text-sm text-blue-700 font-medium">Projects Built</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
          <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
          <div className="text-sm text-purple-700 font-medium">Technologies</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
          <div className="text-3xl font-bold text-green-600 mb-2">4</div>
          <div className="text-sm text-green-700 font-medium">Certifications</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
          <div className="text-3xl font-bold text-orange-600 mb-2">2023</div>
          <div className="text-sm text-orange-700 font-medium">Started Journey</div>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutSection