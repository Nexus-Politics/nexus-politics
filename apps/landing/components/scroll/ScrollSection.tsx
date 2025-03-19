"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScroll } from "./ScrollController";

interface ScrollSectionProps {
  id: string;
  className?: string;
  onVisible?: (inView: boolean) => void;
  threshold?: number;
  children: React.ReactNode;
  isHero?: boolean;
}

export default function ScrollSection({
  id,
  className = "",
  onVisible,
  threshold = 0.5,
  children,
  isHero = false,
}: ScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibilityPercent, setVisibilityPercent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY, viewportHeight } = useScroll();

  // Calculate visibility percentage based on scroll position
  useEffect(() => {
    const calculateVisibility = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, sectionTop);
      const visibleBottom = Math.min(viewportHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // Calculate percentage of section visible (0 to 1)
      const percentVisible = visibleHeight / rect.height;

      // Adjust this formula to control when a section is considered "in view"
      // This creates a bell curve where visibility peaks when the section is centered
      let adjustedPercent = 0;

      // Calculate the center position of the section relative to viewport
      const sectionCenter = sectionTop + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = viewportHeight / 2 + rect.height / 2;

      // Create a bell curve based on distance from center
      adjustedPercent = Math.max(0, 1 - distanceFromCenter / maxDistance);

      // For hero section, use a different calculation
      if (isHero) {
        // Hero section fades out as we scroll down
        adjustedPercent = Math.max(0, 1 - scrollY / (viewportHeight * 0.8));
      }

      adjustedPercent = Math.pow(adjustedPercent, 1.5); // Sharpen the curve

      setVisibilityPercent(adjustedPercent);
      setIsVisible(adjustedPercent > 0.5);

      if (onVisible && adjustedPercent > 0.7) {
        onVisible(true);
      }
    };

    calculateVisibility();
    window.addEventListener("scroll", calculateVisibility);
    window.addEventListener("resize", calculateVisibility);

    return () => {
      window.removeEventListener("scroll", calculateVisibility);
      window.removeEventListener("resize", calculateVisibility);
    };
  }, [scrollY, viewportHeight, onVisible, isHero]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`min-h-screen w-full flex items-center justify-center ${className}`}
      style={{
        zIndex: isVisible ? 10 : 1,
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibilityPercent }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl px-4 py-16"
      >
        {children}
      </motion.div>
    </section>
  );
}
