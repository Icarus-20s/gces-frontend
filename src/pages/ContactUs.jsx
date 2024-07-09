import React, { useState } from "react";
import "../Css/contact.css";
import api from "../Apis/index.jsx"
const ContactUs = () => {
 const[email,setEmail] = useState('')
 const[name,setName] = useState('')
 const[message,setMessage] = useState('')
  
  const [isSubmitted,setIsSubmitted] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("http://localhost:8000/contact/", {name,email,message});
      if (response.status === 201) {
        setIsSubmitted(true)
        console.log("data submitted");
      }
    } catch (error) {
      console.log({ error: error });
    }
  };
  if(isSubmitted){
  return (
    <div className="contact-us-container">
      <div className="thank-you-message">
        <h2>Thank You!</h2>
        <p>Your message has been sent successfully.</p>
      </div>
    </div>
  );
};

return (
  <div className="contact-us-container">
    <h1>Contact Us</h1>
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
          required
        />
      </div>
      <button type="submit" className="contact-button" onClick={handleSubmit}>
        Send
      </button>
    </form>
  </div>
);
}

export default ContactUs;
