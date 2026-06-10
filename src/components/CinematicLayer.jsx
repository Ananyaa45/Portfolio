"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

export default function CinematicLayer() {
  const containerRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 30;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. Create particle texture programmatically (glowing bokeh circles)
    const createParticleTexture = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      // Draw radial gradient
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 130, 45, 0.8)"); // Warm orange/amber glow
      gradient.addColorStop(0.5, "rgba(255, 70, 10, 0.2)");  // Soft outer glow
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");          // Fade to transparent

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createParticleTexture();

    // 5. Particles geometry
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 60; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10; // Z (-60 to -10)

      // Animation speeds and oscillation phases
      speeds[i * 3] = (Math.random() - 0.5) * 0.02; // dx
      speeds[i * 3 + 1] = (Math.random() * 0.03) + 0.01; // dy (slowly floating up)
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.01; // dz

      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // 6. Particles material
    const material = new THREE.PointsMaterial({
      size: 1.8,
      sizeAttenuation: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 7. Mouse interaction state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event) => {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 8;
      mouse.targetY = -(event.clientY / window.innerHeight - 0.5) * 6;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      const positionsAttr = geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        // Floating up movement
        positionsAttr[i * 3 + 1] += speeds[i * 3 + 1];

        // Horizontal sine oscillation for organic drifting
        positionsAttr[i * 3] += Math.sin(time + phases[i]) * 0.015;

        // Reset particles that float off the screen top
        if (positionsAttr[i * 3 + 1] > 30) {
          positionsAttr[i * 3 + 1] = -30;
          positionsAttr[i * 3] = (Math.random() - 0.5) * 60;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Smooth camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x;
      camera.position.y = mouse.y;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 10. Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      // Dispose Three.js objects to avoid memory leaks
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.canvasContainer} id="threejs-layer" />;
}
