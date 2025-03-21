"use client";

import { motion } from "framer-motion";
import LogoMarquee from "./LogoMarquee";
import ScrollSection from "./scroll/ScrollSection";
import WaitlistForm from "./WaitlistForm";

interface HeroSectionProps {
  onVisible: (visible: boolean) => void;
}

export default function HeroSection({ onVisible }: HeroSectionProps) {
  return (
    <ScrollSection
      id="hero"
      onVisible={onVisible}
      className="relative z-10"
      isHero={true}
    >
      <div className="flex flex-col items-center gap-8 text-center">
        <motion.h1
          className="text-glow text-5xl font-bold md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Enabling Digital Democracy
        </motion.h1>
        <motion.p
          className="max-w-2xl text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Nexus Politics is a platform that connects citizens with their
          representatives to solve local problems together.
        </motion.p>

        <motion.div
          className="mt-8 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <WaitlistForm variant="inline" />
        </motion.div>

        <LogoMarquee />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform flex-col items-center"
        >
          <p className="mb-2 text-[#C9DBFD]/70">Scroll to explore</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-bounce"
          >
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="#C9DBFD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
