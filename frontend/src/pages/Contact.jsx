import React, { useState } from 'react';
import GradientText from "../components/GradientText.jsx";
import { SocialIcon } from 'react-social-icons'
import VariableProximity from '../components/VariableProximity.jsx';
import { useRef } from "react";


const socialLinks = [
  {
    url: 'https://www.linkedin.com/in/yong-shen-wong-507517309/',
    label: 'LinkedIn',
    bgColor: '#1628b1',
    hoverColor: '#3b4eea'
  },
  {
    url: 'https://github.com/hanswys?tab=repositories',
    label: 'GitHub',
    bgColor: '#1628b1',
    hoverColor: '#3b4eea'
  },
  {
    url: 'mailto:your@email.com',
    label: 'Email',
    bgColor: '#1628b1',
    hoverColor: '#3b4eea'
  }
];

const Contact = () => {
  const containerRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [hovered, setHovered] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <GradientText
        colors={["#1628b1", "#eee617", "#1628b1", "#eee617", "#1628b1"]}
        animationSpeed={7}
        showBorder={false}
        className="custom-class"
      >
        Contact Me!
      </GradientText>
       <div ref={containerRef} style={{ textAlign: "center", marginBottom: 24  }}>
              <VariableProximity
                label={
                  "Schedule your exams with ease! Seamless exports to any Calendar."
                }
                className={"variable-proximity-demo"}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
            </div>
      
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%"}}>
          <label style={{ display: "block", marginBottom: 2 }}>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 2 }}
          />
        </div>
        <div style={{ width: "100%", marginBottom: 2 }}>
          <label style={{ display: "block", marginBottom: 2 }}>Email:</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 2 }}
          />
        </div>
        <div style={{ width: "100%", marginBottom: 2 }}>
          <label style={{ display: "block", marginBottom: 2 }}>Subject:</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 2 }}
          />
        </div>
        <div style={{ width: "100%", marginBottom: 2 }}>
          <label style={{ display: "block", marginBottom: 2 }}>Message:</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 2, minHeight: 80 }}
          />
        </div>
        <button type="submit" style={{ alignSelf: "center" }}>Send</button>
      </form>
      <div style={{ marginTop: 32, textAlign: "center", width: "100%" }}>
        <h4>Connect with me:</h4>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          {socialLinks.map((link, idx) => (
            <span
              key={link.label}
              style={{ borderRadius: "50%" }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <SocialIcon
                url={link.url}
                bgColor={hovered === idx ? link.hoverColor : link.bgColor}
                style={{ transition: "background 0.2s" }}
                target="_blank"
                rel="noopener noreferrer"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;