"use client";

import { motion } from "framer-motion";
import {
  BrainIcon,
  MapPinIcon,
  MessagesSquareIcon,
  NetworkIcon,
  TrendingUpIcon,
} from "lucide-react";
import { BentoCard, BentoGrid } from "./magicui/bento-grid";
import ProblemFlowAnimation from "./ProblemFlowAnimation";

// Visual components for feature backgrounds
const SentimentBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <svg className="absolute inset-0 h-full w-full">
      <path
        d="M0,80 Q50,20 100,70 Q150,120 200,60 Q250,0 300,40"
        fill="none"
        stroke="#DA655E"
        strokeWidth="3"
        strokeOpacity="0.5"
      />
      <path
        d="M0,100 Q50,130 100,90 Q150,50 200,70 Q250,90 300,60"
        fill="none"
        stroke="#C9DBFD"
        strokeWidth="3"
        strokeOpacity="0.5"
      />
    </svg>
  </div>
);

const GeographicBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute left-1/4 top-1/4 h-16 w-16 rounded-full bg-[#DA655E] opacity-20"></div>
    <div className="absolute left-1/2 top-2/3 h-12 w-12 rounded-full bg-[#9B3D3D] opacity-20"></div>
    <div className="absolute left-2/3 top-1/3 h-20 w-20 rounded-full bg-[#C9DBFD] opacity-20"></div>
    <div className="absolute bottom-1/4 left-1/3 h-14 w-14 rounded-full bg-[#DA655E] opacity-15"></div>
    <div className="w-18 h-18 absolute bottom-1/3 right-1/4 rounded-full bg-[#C9DBFD] opacity-15"></div>

    <svg className="absolute inset-0 h-full w-full">
      <path
        d="M20,20 L40,30 L60,20 L80,40 L100,30 L120,50 L140,45 L160,60 L180,50 L200,70 L220,60 L240,80 L260,70 L280,90"
        fill="none"
        stroke="#102C33"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      <path
        d="M20,60 L40,50 L60,70 L80,60 L100,80 L120,70 L140,90 L160,80 L180,100 L200,90 L220,110 L240,100 L260,120 L280,110"
        fill="none"
        stroke="#102C33"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      <path
        d="M20,100 L40,110 L60,100 L80,120 L100,110 L120,130 L140,125 L160,140 L180,130 L200,150 L220,140 L240,160 L260,150 L280,170"
        fill="none"
        stroke="#DA655E"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
    </svg>
  </div>
);

const CommunicationBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute right-1/4 top-1/4 h-16 w-20 rounded-lg bg-[#C9DBFD] opacity-20"></div>
    <div className="absolute left-1/4 top-1/2 h-16 w-24 rounded-lg bg-[#DA655E] opacity-20"></div>
    <div className="absolute right-1/3 top-3/4 h-16 w-16 rounded-lg bg-[#C9DBFD] opacity-20"></div>

    {/* Additional message bubbles for the extended space */}
    <div className="w-18 absolute bottom-1/4 left-1/3 h-14 rounded-lg bg-[#DA655E] opacity-15"></div>
    <div className="w-22 h-15 absolute bottom-1/3 right-1/4 rounded-lg bg-[#C9DBFD] opacity-15"></div>

    {/* Connection lines */}
    <svg className="absolute inset-0 h-full w-full">
      <path
        d="M80,80 C120,60 160,100 200,70"
        fill="none"
        stroke="#DA655E"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="4,4"
      />
      <path
        d="M200,120 C160,140 120,100 80,130"
        fill="none"
        stroke="#C9DBFD"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="4,4"
      />
      <path
        d="M60,180 C100,160 140,200 180,170"
        fill="none"
        stroke="#DA655E"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="4,4"
      />
    </svg>
  </div>
);

const InsightsBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <svg className="absolute inset-0 h-full w-full">
      <rect
        x="30"
        y="100"
        width="20"
        height="40"
        rx="2"
        fill="#DA655E"
        fillOpacity="0.5"
      />
      <rect
        x="60"
        y="80"
        width="20"
        height="60"
        rx="2"
        fill="#C9DBFD"
        fillOpacity="0.5"
      />
      <rect
        x="90"
        y="60"
        width="20"
        height="80"
        rx="2"
        fill="#DA655E"
        fillOpacity="0.5"
      />
      <rect
        x="120"
        y="40"
        width="20"
        height="100"
        rx="2"
        fill="#C9DBFD"
        fillOpacity="0.5"
      />
      <rect
        x="150"
        y="70"
        width="20"
        height="70"
        rx="2"
        fill="#DA655E"
        fillOpacity="0.5"
      />
      <rect
        x="180"
        y="50"
        width="20"
        height="90"
        rx="2"
        fill="#C9DBFD"
        fillOpacity="0.5"
      />
      <rect
        x="210"
        y="30"
        width="20"
        height="110"
        rx="2"
        fill="#DA655E"
        fillOpacity="0.5"
      />
    </svg>
  </div>
);

const features = [
  {
    Icon: NetworkIcon,
    name: "Problem Clustering",
    description:
      "AI-powered algorithms identify common patterns across seemingly unrelated citizen issues, revealing core problems.",
    href: "#",
    cta: "Learn more",
    background: <ProblemFlowAnimation className="h-full min-h-[400px]" />,
    className: "lg:col-span-1 lg:row-span-3 min-h-[400px]",
  },
  {
    Icon: TrendingUpIcon,
    name: "Constituent Sentiment Analysis",
    description:
      "Track public sentiment around issues over time, identify emerging concerns, and measure policy impact.",
    href: "#",
    cta: "Learn more",
    background: <SentimentBackground />,
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: MapPinIcon,
    name: "Geographic Problem Heatmaps",
    description:
      "Visualize issues across regions to identify neighborhood-specific problems and allocate resources effectively.",
    href: "#",
    cta: "Learn more",
    background: <GeographicBackground />,
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    Icon: MessagesSquareIcon,
    name: "Direct Communication",
    description:
      "Seamless connection between citizens and representatives on the issues that matter most.",
    href: "#",
    cta: "Learn more",
    background: <CommunicationBackground />,
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    Icon: BrainIcon,
    name: "AI-Powered Insights",
    description:
      "Stay informed with up-to-date data and analytics on emerging citizen concerns and priorities.",
    href: "#",
    cta: "Learn more",
    background: <InsightsBackground />,
    className: "lg:col-span-2 lg:row-span-1",
  },
];

export default function FeaturesBentoGrid() {
  return (
    <section className="relative z-10 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold text-white">Key Features</h2>
          <p className="mx-auto max-w-2xl text-xl text-[#C9DBFD]">
            Powerful tools that transform how citizens and politicians connect
            and solve problems together.
          </p>
        </motion.div>

        <BentoGrid className="gap-4 lg:grid-cols-3 lg:grid-rows-4">
          {features.map((feature, idx) => (
            <BentoCard
              key={feature.name}
              {...feature}
              className={`group overflow-hidden border-[#102C33] bg-gradient-to-b from-[#0E191C]/90 to-[#102C33]/70 hover:border-[#C9DBFD]/30 ${feature.className}`}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DA655E] text-white transition-colors group-hover:bg-[#9B3D3D]">
                    <feature.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#C9DBFD]">
                    {feature.name}
                  </h3>
                </div>
                <p className="mt-2 text-[#C9DBFD] transition-colors group-hover:text-white">
                  {feature.description}
                </p>

                <div className="mt-4 text-sm font-medium text-[#DA655E] transition-all group-hover:translate-x-1 group-hover:text-[#C9DBFD]">
                  {feature.cta} →
                </div>
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
