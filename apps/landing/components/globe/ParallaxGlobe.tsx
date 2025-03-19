"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "../scroll/ScrollController";
import EnhancedGlobe, { GlobeProps } from "./EnhancedGlobe";

interface ParallaxGlobeProps extends GlobeProps {
  activeSection: number;
}

export default function ParallaxGlobe({
  activeSection,
  ...globeProps
}: ParallaxGlobeProps) {
  const { isScrolledPastHero, scrollY, viewportHeight, scrollRatio } =
    useScroll();
  const [initialHeroHeight, setInitialHeroHeight] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const initialAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Store the initial hero height on first render
  useEffect(() => {
    if (initialHeroHeight === 0) {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        setInitialHeroHeight(heroSection.offsetHeight);
      }
    }

    // Set up initial animation with a staged approach
    // First ensure the globe is positioned below the viewport before any rendering
    document.documentElement.style.setProperty(
      "--initial-globe-position",
      `${window.innerHeight + 200}px`,
    );

    // Then trigger the animation after a slight delay to ensure proper positioning
    initialAnimationTimeoutRef.current = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 300); // Allow time for initial rendering

    return () => {
      if (initialAnimationTimeoutRef.current) {
        clearTimeout(initialAnimationTimeoutRef.current);
      }
    };
  }, [initialHeroHeight]);

  // Calculate opacity based on active section
  const getGlobeOpacity = () => {
    // When we reach the core problems focus section, reduce opacity
    if (activeSection === 5) return 0.3;
    if (activeSection === 6) return 0.8;
    return 1;
  };

  // Calculate the position of the globe
  const getGlobePosition = () => {
    // If we haven't completed the initial load animation yet
    if (!initialLoadComplete) {
      return {
        position: "absolute" as const,
        top: "var(--initial-globe-position)", // Use CSS variable for initial position
        left: "50%",
        transform: "translateX(-50%)",
        transition: "none", // Disable transition initially
      };
    }

    if (!isScrolledPastHero) {
      // Position at the bottom of the hero section
      return {
        position: "absolute" as const,
        top: `${initialHeroHeight - 300}px`, // Position below hero
        left: "50%",
        transform: "translateX(-50%)",
      };
    } else {
      // Fixed in the center of the screen
      return {
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }
  };

  // Apply smooth transition to globe size based on scroll
  const getGlobeSize = () => {
    // Start slightly smaller and grow to full size
    if (!isScrolledPastHero) {
      return "80%";
    }

    // After scrolling past hero, maintain full size
    return "100%";
  };

  // Determine the appropriate transition
  const getTransitionStyle = () => {
    // No transition initially (to prevent unwanted animations)
    if (!initialLoadComplete) {
      return "";
    }

    // Apply transition after initial positioning
    return "transition-all duration-1500 ease-out";
  };

  return (
    <div
      className={`globe-container ${getTransitionStyle()}`}
      style={{
        ...getGlobePosition(),
        width: getGlobeSize(),
        maxWidth: "600px",
        zIndex: 0,
        opacity: getGlobeOpacity(),
        pointerEvents: "none",
      }}
    >
      <EnhancedGlobe {...globeProps} />
    </div>
  );
}
