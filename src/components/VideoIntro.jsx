"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./VideoIntro.module.css";

// Cinematic developer workspace video source (Mixkit royalty-free MP4)
// Easily swappable to a local file (e.g. "/video/talking_head.mp4")
const VIDEO_SOURCE = "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34288-large.mp4";

export default function VideoIntro() {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const textRef = useRef(null);
  const badgeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // Synchronize play state between main video and ambient background video
  const togglePlay = () => {
    if (videoRef.current && bgVideoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        bgVideoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Play failed: ", e));
        bgVideoRef.current.play().catch(e => console.log("Play failed: ", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute on main video
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setShowSoundHint(false); // Hide sound badge when user interacts with mute
    }
  };

  // Initial volume setup and GSAP animations
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.muted = true;
    }

    // Auto-hide the sound hint after 6 seconds
    const timer = setTimeout(() => {
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.8,
          onComplete: () => setShowSoundHint(false),
        });
      } else {
        setShowSoundHint(false);
      }
    }, 6000);

    // GSAP Entrance Animations
    const ctx = gsap.context(() => {
      // Intro overlay fade-in
      gsap.fromTo(
        `.${styles.heroContainer}`,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // Foreground video screen scale/fade-in
      gsap.fromTo(
        `.${styles.videoWrapper}`,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, delay: 0.3, ease: "power3.out" }
      );

      // Title and subtitles text stagger
      gsap.fromTo(
        `.${styles.animateText}`,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          delay: 0.6,
          ease: "power3.out",
        }
      );

      // UI Controls and Badge fade-in
      gsap.fromTo(
        [`.${styles.controls}`, `.${styles.scrollIndicator}`, `.${styles.soundHint}`],
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.4, ease: "power2.out" }
      );
    }, textRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.heroContainer} ref={textRef}>
      {/* 1. Ambient Blurred Background Video */}
      <div className={styles.ambientWrapper}>
        <video
          ref={bgVideoRef}
          className={styles.ambientVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/developer.mp4" type="video/mp4" />
          <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Gradient Overlay for Readability */}
      <div className={styles.gradientOverlay} />
      <div className={styles.radialVignette} />

      {/* 3. Main Foreground Content Grid */}
      <div className={styles.contentGrid}>
        
        {/* Left Side: Typography and Text */}
        <div className={styles.textContainer}>
          <p className={`${styles.tagline} ${styles.animateText}`}>
            SOFTWARE DEVELOPER &amp; DESIGNER
          </p>
          <h1 className={`${styles.title} ${styles.animateText}`}>
            <span>ANANYAA</span>
            <span>MAITY</span>
          </h1>
          <p className={`${styles.subtitle} ${styles.animateText}`}>
            Crafting modern web experiences, scalable backend architectures,
            and visually immersive digital products. Welcome to my creative space.
          </p>
          
          {/* Glassmorphic Media Controls */}
          <div className={`${styles.controls} ${styles.animateText}`}>
            <button onClick={togglePlay} className={styles.glassButton} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className={styles.controlIcon}><path fill="currentColor" d="M14 19h4V5h-4v14zm-6 0h4V5H8v14z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" className={styles.controlIcon}><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
              )}
              <span>{isPlaying ? "Pause Screen" : "Resume Screen"}</span>
            </button>

            <button onClick={toggleMute} className={styles.glassButton} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? (
                <svg viewBox="0 0 24 24" className={styles.controlIcon}><path fill="currentColor" d="M3.63 3.63L2.37 4.89 7.48 10H3v4h3l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81l2.42 2.42 1.27-1.27L3.63 3.63zM9 15.17L6.83 13H5v-2h1.83L9 8.83v6.34zM12 4L9.91 6.09 12 8.18V4zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" className={styles.controlIcon}><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              )}
              <span>{isMuted ? "Tap for Sound" : "Mute Sound"}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Foreground Cinema Video Screen */}
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video
              ref={videoRef}
              className={styles.foregroundVideo}
              autoPlay
              loop
              muted
              playsInline
              onClick={togglePlay}
            >
              <source src="/developer.mp4" type="video/mp4" />
              <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            </video>
            {/* Ambient video subtle border glow */}
            <div className={styles.videoBorderGlow} />
          </div>
        </div>

      </div>

      {/* 4. Tap for Sound Animated Badge */}
      {showSoundHint && (
        <div
          ref={badgeRef}
          className={styles.soundHint}
          onClick={toggleMute}
          title="Click to enable cinematic audio"
        >
          <span className={styles.pulseDot} />
          <span>Tap for cinematic audio</span>
        </div>
      )}

      {/* 5. Scroll Down Indicator */}
      <div className={styles.scrollIndicator} onClick={handleScrollDown}>
        <span className={styles.scrollText}>Discover More</span>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </div>
    </div>
  );
}
