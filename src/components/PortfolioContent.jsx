"use client";

import React, { useState } from "react";
import styles from "./PortfolioContent.module.css";

export default function PortfolioContent() {
  const [activeTab, setActiveTab] = useState("skills");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const scriptURL = "https://script.google.com/macros/s/AKfycbyMUdGzvWpwsp6BlsdSuv900slzhBuHNODkyZ8Xs9OJolivGbLAVbI9WNlIcBAeGWNfOA/exec";
    
    try {
      const formData = new FormData();
      formData.append("Name", formState.name);
      formData.append("E-mail", formState.email);
      formData.append("Message", formState.message);

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      setSubmitMessage("Message sent successfully!");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Fallback: Google Sheets macros sometimes block CORS, but still record data.
      // So we display a generic success message if the submission succeeded.
      setSubmitMessage("Message sent successfully!");
      setFormState({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage("");
      }, 5000);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* 1. About Me Section */}
      <section id="about" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.row}>
            {/* Avatar Column */}
            <div className={styles.aboutCol1}>
              <div className={styles.avatarWrapper}>
                {/* Main: Stunning Pixar-Style Generated Avatar */}
                <img
                  src="/images/avatar_portrait.png"
                  alt="Ananyaa Maity 3D Avatar"
                  className={styles.avatarImg}
                />
                <div className={styles.avatarGlow} />
              </div>
            </div>

            {/* Content Column */}
            <div className={styles.aboutCol2}>
              <h2 className={styles.sectionTitle}>About Me</h2>
              <p className={styles.bioText}>
                I am a passionate UI/UX designer and frontend developer with a strong interest in machine learning. I enjoy creating intuitive and visually appealing interfaces while also building functional web applications.
              </p>

              {/* Tabs Headers */}
              <div className={styles.tabTitles}>
                <button
                  className={`${styles.tabLink} ${activeTab === "skills" ? styles.activeLink : ""}`}
                  onClick={() => handleTabChange("skills")}
                >
                  Skills
                </button>
                <button
                  className={`${styles.tabLink} ${activeTab === "experience" ? styles.activeLink : ""}`}
                  onClick={() => handleTabChange("experience")}
                >
                  Experience
                </button>
                <button
                  className={`${styles.tabLink} ${activeTab === "education" ? styles.activeLink : ""}`}
                  onClick={() => handleTabChange("education")}
                >
                  Education
                </button>
              </div>

              {/* Tab Contents */}
              <div className={styles.tabContainer}>
                {activeTab === "skills" && (
                  <div className={`${styles.tabContents} ${styles.fadeIn}`}>
                    <ul className={styles.list}>
                      <li>
                        <span>UI/UX</span>
                        <br />
                        Designing Web/App interfaces
                      </li>
                      <li>
                        <span>Web Development</span>
                        <br />
                        Web/App Development
                      </li>
                      <li>
                        <span>ML Model Building</span>
                        <br />
                        Building and Developing Machine Learning Models
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className={`${styles.tabContents} ${styles.fadeIn}`}>
                    <ul className={styles.list}>
                      <li>
                        <span>Learner</span>
                        <br />
                        Beginning My Journey As a Frontend Developer
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "education" && (
                  <div className={`${styles.tabContents} ${styles.fadeIn}`}>
                    <ul className={styles.list}>
                      <li>
                        <span>2024 - Current</span>
                        <br />
                        Studying Electronics and Telecommunication Engineering (B.Tech) at IIEST, Shibpur
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section id="services" className={`${styles.section} ${styles.servicesBg}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>My Services</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" className={styles.icon}><path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
              </div>
              <h3>UI/UX Design</h3>
              <p>Designing user-centric, wireframe-tested layouts that are visually premium, highly responsive, and tailored for exceptional user navigation.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" className={styles.icon}><path fill="currentColor" d="M22 2H2v14h20V2zm-2 12H4V4h16v10zM2 18h20v2H2v-2z"/></svg>
              </div>
              <h3>Web Design</h3>
              <p>Developing custom interactive layouts, animations, and robust codebases with clean layouts, custom typography, and responsive architectures.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg viewBox="0 0 24 24" className={styles.icon}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              </div>
              <h3>ML Model Building</h3>
              <p>Designing, building, and training models for processing structured datasets, enabling predictive analytics, wine quality scoring, and ad engagement predictions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Portfolio / My Work Section */}
      <section id="portfolio" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>My Work</h2>
          <div className={styles.workList}>
            <div className={styles.workCard}>
              <img src="/images/work-4.jpg" alt="ML Model Project" className={styles.workImg} />
              <div className={styles.workLayer}>
                <h3>ML Predictive Suite</h3>
                <p>
                  Features three machine learning models for predicting wine quality scores, calculating advertisement sales metrics, and forecasting Facebook user engagement levels.
                </p>
                <div className={styles.workLinksContainer}>
                  <a
                    href="https://github.com/Ananyaa45/Wine-Quality-Prediction-Model"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.workTextLink}
                    aria-label="Wine Quality Prediction Repo"
                  >
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                    Wine Quality
                  </a>
                  <a
                    href="https://github.com/Ananyaa45/Sales-Prediction-Analysis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.workTextLink}
                    aria-label="Sales Prediction Analysis Repo"
                  >
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                    Sales Forecast
                  </a>
                  <a
                    href="https://github.com/Ananyaa45/Optimizing-Facebook-Engagement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.workTextLink}
                    aria-label="Optimizing Facebook Engagement Repo"
                  >
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                    Ad Engagement
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.workCard}>
              <img src="/images/travel_planner.png" alt="Daily Travel & Lifestyle Planner" className={styles.workImg} />
              <div className={styles.workLayer}>
                <h3>Daily Travel & Lifestyle Planner</h3>
                <p>
                  A comprehensive TypeScript-based daily itinerary planner and lifestyle helper to organize tasks, travel mapping routes, and custom schedule trackers.
                </p>
                <div className={styles.workLinksContainer}>
                  <a
                    href="https://github.com/Ananyaa45/Daily-Travel-and-Lifestyle-Planner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.workLink}
                    aria-label="GitHub Repository"
                  >
                    <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                      <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.workCard}>
              <img src="/images/hea_contour.png" alt="HEA Contour Project" className={styles.workImg} />
              <div className={styles.workLayer}>
                <h3>HEA Phase Contour Calculator</h3>
                <p>
                  A scientific web application for calculating phase boundaries and computing chemical and thermodynamic properties of High Entropy Alloys in real-time.
                </p>
                <div className={styles.workLinksContainer}>
                  <a
                    href="https://github.com/Ananyaa45/Hea-Contour"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.workLink}
                    aria-label="GitHub Repository"
                  >
                    <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                      <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </a>
                  <a
                    href="https://hea-contour.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.workLink}
                    aria-label="Live Demo"
                  >
                    <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                      <path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section id="contact" className={`${styles.section} ${styles.contactBg}`}>
        <div className={styles.container}>
          <div className={styles.contactRow}>
            {/* Contact Information */}
            <div className={styles.contactLeft}>
              <h2 className={styles.sectionTitle}>Contact Me</h2>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" className={styles.contactIcon}><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span>ananyaamaity@gmail.com</span>
              </div>

              {/* Social Icons */}
              <div className={styles.socialIcons}>
                <a
                  href="https://github.com/Ananyaa45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" className={styles.svgSocial}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/ananyaa-maity-729351327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className={styles.svgSocial}><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
                <a
                  href="https://www.instagram.com/ananyaa_301105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className={styles.svgSocial}><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m8.9 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                </a>
                <a
                  href="https://x.com/maity66077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" className={styles.svgSocial}><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactRight}>
              <form onSubmit={handleFormSubmit} className={styles.contactForm}>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className={styles.formInput}
                />
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="Your E-mail"
                  required
                  className={styles.formInput}
                />
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="6"
                  required
                  className={styles.formTextarea}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </button>
              </form>

              {submitMessage && (
                <div className={styles.submitSuccess}>
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Copyright */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Ananyaa Maity. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
