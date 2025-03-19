"use client";

import { useEffect } from "react";

/**
 * PreloadController sets up initial page state before visual rendering
 * to ensure smooth animations and transitions
 */
export default function PreloadController() {
  useEffect(() => {
    // Add initial load class to prevent scrolling during page initialization
    document.body.classList.add("initial-load");

    // Force scroll to top on initial load
    window.scrollTo(0, 0);

    // Set initial CSS variables for page load animations
    document.documentElement.style.setProperty(
      "--initial-globe-position",
      `${window.innerHeight + 200}px`,
    );

    // Add class to body when JS is loaded to enable animations
    document.body.classList.add("js-loaded");

    // Remove any loading state classes
    setTimeout(() => {
      window.scrollTo(0, 0); // Ensure scroll position is at top again
      document.body.classList.add("animations-ready");

      // Remove the initial load class to allow scrolling again
      setTimeout(() => {
        document.body.classList.remove("initial-load");
      }, 500); // Allow time for animations to settle
    }, 100);

    return () => {
      document.body.classList.remove("js-loaded");
      document.body.classList.remove("animations-ready");
      document.body.classList.remove("initial-load");
    };
  }, []);

  // This component doesn't render anything
  return null;
}
