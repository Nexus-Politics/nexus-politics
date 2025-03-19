"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "./magicui/animated-beam";

// Problem node component
const ProblemNode = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>((props, ref) => {
  const { className, children } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-[#C9DBFD]/30 bg-[#0E191C] p-2 shadow-[0_0_15px_-5px_rgba(201,219,253,0.3)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

ProblemNode.displayName = "ProblemNode";

// Central nexus node
const NexusNode = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>((props, ref) => {
  const { className, children } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "flex size-16 items-center justify-center rounded-full border-2 border-[#DA655E]/70 bg-[#0E191C] p-3 shadow-[0_0_25px_-5px_rgba(218,101,94,0.5)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

NexusNode.displayName = "NexusNode";

// Politician node
const PoliticianNode = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>((props, ref) => {
  const { className, children } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "flex size-14 items-center justify-center rounded-full border border-[#C9DBFD]/50 bg-[#0E191C] p-2.5 shadow-[0_0_20px_-5px_rgba(201,219,253,0.4)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

PoliticianNode.displayName = "PoliticianNode";

export default function ProblemFlowAnimation({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Problem nodes
  const problem1Ref = useRef<HTMLDivElement>(null);
  const problem2Ref = useRef<HTMLDivElement>(null);
  const problem3Ref = useRef<HTMLDivElement>(null);
  const problem4Ref = useRef<HTMLDivElement>(null);
  // Central nexus node
  const nexusRef = useRef<HTMLDivElement>(null);
  // Politician node
  const politicianRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden py-4", className)}
      ref={containerRef}
    >
      <div className="flex h-full flex-col items-center justify-between">
        {/* Top section - Citizens with problems */}
        <div className="flex w-full justify-around pt-2">
          <ProblemNode ref={problem1Ref} className="bg-[#0E191C]/80">
            <CitizenIcon color="#DA655E" />
          </ProblemNode>
          <ProblemNode ref={problem2Ref} className="bg-[#0E191C]/80">
            <CitizenIcon color="#C9DBFD" />
          </ProblemNode>
          <ProblemNode ref={problem3Ref} className="bg-[#0E191C]/80">
            <CitizenIcon color="#9B3D3D" />
          </ProblemNode>
          <ProblemNode ref={problem4Ref} className="bg-[#0E191C]/80">
            <CitizenIcon color="#C9DBFD" />
          </ProblemNode>
        </div>

        {/* Middle section - Nexus Politics (stretched vertically) */}
        <div className="my-16">
          {/* Increased vertical spacing */}
          <NexusNode ref={nexusRef}>
            <NexusPoliticsLogo />
          </NexusNode>
        </div>

        {/* Bottom section - Politician */}
        <div className="pb-4">
          <PoliticianNode ref={politicianRef}>
            <GovernmentIcon />
          </PoliticianNode>
        </div>
      </div>

      {/* Connection beams - Only flowing from top to bottom */}
      {/* Beams from citizens to nexus - flowing downward (not reversed) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={problem1Ref}
        toRef={nexusRef}
        curvature={-20}
        pathColor="#102C33"
        pathWidth={1.5}
        pathOpacity={0.3}
        gradientStartColor="#DA655E"
        gradientStopColor="#C9DBFD"
        delay={0.2}
        reverse={false}
      />
      {/*
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={problem2Ref}
        toRef={nexusRef}
        // curvature={-20}
        // pathColor="#102C33"
        // pathWidth={1.5}
        // pathOpacity={0.3}
        // gradientStartColor="#DA655E"
        // gradientStopColor="#C9DBFD"
        // delay={0.5}
        // reverse={false}
      />
      */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={problem3Ref}
        toRef={nexusRef}
        curvature={-20}
        pathColor="#102C33"
        pathWidth={1.5}
        pathOpacity={0.3}
        gradientStartColor="#DA655E"
        gradientStopColor="#C9DBFD"
        delay={0.8}
        reverse={false}
      />
      {/*
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={problem4Ref}
        toRef={nexusRef}
        curvature={-20}
        pathColor="#102C33"
        pathWidth={1.5}
        pathOpacity={0.3}
        gradientStartColor="#DA655E"
        gradientStopColor="#C9DBFD"
        delay={1.1}
        reverse={false}
      />
      */}
      {/* Beam from nexus to politician - flowing downward (not reversed) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={nexusRef}
        toRef={politicianRef}
        curvature={20}
        pathColor="#102C33"
        pathWidth={2}
        pathOpacity={0.3}
        gradientStartColor="#C9DBFD"
        gradientStopColor="#9B3D3D"
        delay={1.5}
        reverse={false}
        duration={10}
      />
    </div>
  );
}

// Icon components
const CitizenIcon = ({ color = "#C9DBFD" }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const NexusPoliticsLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7.5L12 13L22 7.5L12 2Z"
      stroke="#DA655E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 16.5L12 22L22 16.5"
      stroke="#DA655E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17.5L22 12"
      stroke="#DA655E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GovernmentIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C9DBFD"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
    <path d="M8 9.5l8 0"></path>
    <path d="M8 12.5l8 0"></path>
  </svg>
);
