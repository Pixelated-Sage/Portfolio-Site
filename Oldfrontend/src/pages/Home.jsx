import React from 'react'
import Navbar from '../layout/Navbar.jsx'
import Hero from '../layout/Hero.jsx'
import AboutSection from '../layout/AboutSection.jsx'
import ProjectSection from '../layout/ProjectSection.jsx'
import SkillsSection from '../layout/SkillsSection.jsx'
import ContactSection from '../layout/ContactSection.jsx'
import ExperienceSection from '../layout/ExperienceSection.jsx'
import CertificationsSection from '../layout/CertificationsSection.jsx'
import NotesSection from '../layout/NotesSection.jsx'
import Footer from '../layout/Footer.jsx'

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
        <Navbar/>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectSection />
        <ExperienceSection/>
        <CertificationsSection/>
        <NotesSection />
        <ContactSection />
        <Footer />
    </div>
  )
}

export default Home