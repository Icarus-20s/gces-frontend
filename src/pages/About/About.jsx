import React from 'react'
import FacultySection from './FacultySection'
import HistorySection from './HistorySection'
import TestimonialsSection from './TestimonialsSection'
import "./about.css"
const About = () => {
  return (
<div className="about-us">
  <FacultySection />
  <HistorySection />
  <TestimonialsSection />
</div>
  )
}

export default About
