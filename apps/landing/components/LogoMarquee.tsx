"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/logos/buy_me_a_coffee.png", alt: "Buy Me A Coffee" },
  { src: "/logos/exist.jpg", alt: "EXIST" },
  { src: "/logos/microsoft.jpg", alt: "Microsoft" },
  { src: "/logos/social_impact_republic.jpg", alt: "Social Impact Republic" },
  { src: "/logos/tum_school_of_governance.png", alt: "TUM School of Governance" },
  { src: "/logos/tum_think_tank.png", alt: "TUM Think Tank" },
  { src: "/logos/tum.png", alt: "TUM" },
  { src: "/logos/unternehmertum.jpg", alt: "UnternehmerTUM" },
  { src: "/logos/xplore.png", alt: "Xplore" },
];

export default function LogoMarquee() {
  return (
    <motion.div
      className="logo-marquee-container mt-12 w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <div className="logo-marquee-track">
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div
            key={`logo-1-${index}`}
            className="logo-item mx-8 flex h-16 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              className="h-auto max-h-12 w-auto max-w-[120px] object-contain"
            />
          </div>
        ))}

        {/* Duplicate set for continuous effect */}
        {logos.map((logo, index) => (
          <div
            key={`logo-2-${index}`}
            className="logo-item mx-8 flex h-16 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              className="h-auto max-h-12 w-auto max-w-[120px] object-contain"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
