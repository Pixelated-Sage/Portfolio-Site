import React from 'react'

import Navbar from '../layout/Navbar.jsx'
import Hero from '../layout/Hero.jsx'
import AboutSection from '../layout/AboutSection.jsx'
import ProjectSection from '../layout/ProjectSection.jsx'
import SkillsSection from '../layout/SkillsSection.jsx'
import ContactSection from '../layout/ContactSection.jsx'
import ExperienceSection from '../layout/ExprienceSection.jsx'
import CertificationsSection from '../layout/CertificationsSection.jsx'
import NotesSection from '../layout/NotesSection.jsx'
function Home() {
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* <StarsBg /> */}
      {/* <AuroraBg /> */}
      <div className="relative z-10">
        {/* <Navbar/> */}
        <Hero />

        <AboutSection />


        <SkillsSection />

        <ProjectSection />
        <ExperienceSection/>
        <CertificationsSection/>
        <NotesSection />
        <ContactSection />
      </div>
    </div>
  )
}

export default Home