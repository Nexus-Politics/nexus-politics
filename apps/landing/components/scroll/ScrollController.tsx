"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ScrollContextType {
  scrollY: number;
  viewportHeight: number;
  // 0 to 1, represents how far down the page we've scrolled
  scrollRatio: number;
  documentHeight: number;
  isScrolledPastHero: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  viewportHeight: 0,
  scrollRatio: 0,
  documentHeight: 0,
  isScrolledPastHero: false,
});

export const useScroll = () => useContext(ScrollContext);

interface ScrollControllerProps {
  children: ReactNode;
  // Percentage of viewport height
  heroHeight?: number;
}

export default function ScrollController({
  children,
  heroHeight = 100,
}: ScrollControllerProps) {
  const [scrollData, setScrollData] = useState<ScrollContextType>({
    scrollY: 0,
    viewportHeight: 0,
    scrollRatio: 0,
    documentHeight: 0,
    isScrolledPastHero: false,
  });

  useEffect(() => {
    // Initialize dimensions
    const updateDimensions = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const scrollY = window.scrollY;
      const scrollRatio =
        documentHeight > viewportHeight
          ? scrollY / (documentHeight - viewportHeight)
          : 0;

      // Calculate if we've scrolled past the hero section
      const heroPixelHeight = (heroHeight / 100) * viewportHeight;
      const isScrolledPastHero = scrollY > heroPixelHeight * 0.5; // Trigger at 50% of hero

      setScrollData({
        scrollY,
        viewportHeight,
        scrollRatio,
        documentHeight,
        isScrolledPastHero,
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Add event listeners
    window.addEventListener("scroll", updateDimensions);
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("scroll", updateDimensions);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [heroHeight]);

  return (
    <ScrollContext.Provider value={scrollData}>
      {children}
    </ScrollContext.Provider>
  );
}
