import React from "react";
import "./testimonials.css";
import pappu from "../../assets/pappu.jpg";
import rahul from "../../assets/rahul.jpg";
import niraj from "../../assets/niraj.jpg";
import pramish from "../../assets/pramish.jpg";
import rijan from "../../assets/rijan.jpg";
import swornim from "../../assets/swornim.jpg";

const testimonials = [
  {
    quote:
      "Attending this college has been a transformative experience. The faculty and staff are incredibly supportive, and I've learned so much.",
    name: "Pratham Poudel",
    class: "Class of 2024",
    image: pappu,
  },
  {
    quote:
      "The programs offered here are top-notch. I've gained valuable skills that have prepared me for my career.",
    name: "Rijan Thapa",
    class: "Class of 2023",
    image: rijan,
  },
  {
    quote:
      "The campus environment is amazing. I've made lifelong friends and memories here.",
    name: "Niraj Giri",
    class: "Class of 2022",
    image: niraj,
  },
  {
    quote:
      "The opportunities for research and internships have been incredible. I've been able to apply what I've learned in real-world settings.",
    name: "Pramish Adhikari",
    class: "Class of 2021",
    image: pramish,
  },
  {
    quote:
      "The diversity and inclusivity at this college make it a great place to learn and grow. Everyone is welcome here.",
    name: "Rahul Sen",
    class: "Class of 2020",
    image: rahul,
  },
  {
    quote:
      "Course materials are up-to-date with cutting edge technology. GCES has got facilities, services and laboratories for the research activities which are destined to outstanding outcomes.",
    name: "Swornim Dhoj",
    class: "Class of 2019",
    image: swornim,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2>Student Testimonials</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <img
              src={testimonial.image}
              alt={`${testimonial.name}'s photo`}
              className="testimonial-image"
            />
            <blockquote>{testimonial.quote}</blockquote>
            <p>
              - {testimonial.name}, {testimonial.class}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
