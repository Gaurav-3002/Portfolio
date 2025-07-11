'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa'
import { Download } from 'lucide-react'
import Image from 'next/image'

interface SocialLink {
  icon: string
  url: string
  label: string
}

interface ProfileWidgetProps {
  imageUrl: string
  cvUrl: string
  socials: SocialLink[]
}

const ProfileWidget: React.FC<ProfileWidgetProps> = ({
  imageUrl,
  cvUrl,
  socials
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = cvUrl
    link.download = 'Gaurav_Kumar_Resume.pdf'
    link.click()
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return FaGithub
      case 'linkedin':
        return FaLinkedinIn
      case 'twitter':
        return FaTwitter
      case 'facebook':
        return FaFacebookF
      case 'instagram':
        return FaInstagram
      default:
        return FaGithub
    }
  }

  return (
    <>
      {/* Desktop Version */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden sm:block"
      >
        <div className="relative flex items-center gap-6">
          {/* Hexagon Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-blue-400 clip-hexagon flex items-center justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src={imageUrl}
                  alt="Gaurav Kumar - Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Social Icons Stack */}
          <div className="flex flex-col gap-3">
            {socials.map((social, index) => {
              const IconComponent = getIcon(social.icon)
              // Assign brand color for each social
              let iconColor = '#fff';
              switch (social.icon) {
                case 'github':
                  iconColor = '#181717'; // GitHub black
                  break;
                case 'linkedin':
                  iconColor = '#0077B5'; // LinkedIn blue
                  break;
                case 'twitter':
                  iconColor = '#1DA1F2'; // Twitter blue
                  break;
                case 'facebook':
                  iconColor = '#1877F3'; // Facebook blue
                  break;
                case 'instagram':
                  iconColor = '#E4405F'; // Instagram pink
                  break;
                default:
                  iconColor = '#fff';
              }
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-4 h-4" color={iconColor} />
                </motion.a>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Mobile Version */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 sm:hidden"
      >
        <AnimatePresence>
          {!isExpanded ? (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src={imageUrl}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl"
            >
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-blue-400 rounded-full flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
                    <Image
                      src={imageUrl}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>

                <div className="flex flex-col gap-2">
                  {socials.map((social, index) => {
                    const IconComponent = getIcon(social.icon)
                    // Assign brand color for each social
                    let iconColor = '#fff';
                    switch (social.icon) {
                      case 'github':
                        iconColor = '#181717'; // GitHub black
                        break;
                      case 'linkedin':
                        iconColor = '#0077B5'; // LinkedIn blue
                        break;
                      case 'twitter':
                        iconColor = '#1DA1F2'; // Twitter blue
                        break;
                      case 'facebook':
                        iconColor = '#1877F3'; // Facebook blue
                        break;
                      case 'instagram':
                        iconColor = '#E4405F'; // Instagram pink
                        break;
                      default:
                        iconColor = '#fff';
                    }
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-3 h-3" color={iconColor} />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default ProfileWidget