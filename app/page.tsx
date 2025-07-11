'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import ProfileIntro from '@/components/ProfileIntro'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import CertificationsSection from '@/components/CertificationsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

// Only lazy load the heavy AnimatedBackground component
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
  loading: () => null, // Remove loading animation to speed up
})

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Animated 3D Background */}
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center min-h-screen">
            <ProfileIntro />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <ErrorBoundary>
            <AboutSection />
          </ErrorBoundary>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <ErrorBoundary>
            <ProjectsSection />
          </ErrorBoundary>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <ErrorBoundary>
            <SkillsSection />
          </ErrorBoundary>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <ErrorBoundary>
            <CertificationsSection />
          </ErrorBoundary>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <ErrorBoundary>
            <ContactSection />
          </ErrorBoundary>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}