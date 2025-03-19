"use client";

import { useEffect, useState } from "react";

import FeaturesBentoGrid from "@/components/FeaturesBentoGrid";
import ParallaxGlobe from "@/components/globe/ParallaxGlobe";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import ProblemVisualization from "@/components/ProblemVisualization";
import ScrollController from "@/components/scroll/ScrollController";
import ScrollIndicator from "@/components/scroll/ScrollIndicator";
import ScrollSection from "@/components/scroll/ScrollSection";
import { Testimonials } from "@/components/Testimonials";
import {
  CORE_PROBLEMS,
  GERMANY_LOCATION,
  GERMANY_PROBLEMS,
  GLOBAL_PROBLEMS,
  USA_PROBLEMS,
} from "@/constants/problems";
import useInitialScroll from "@/lib/useInitialScroll";

export default function Home() {
  useInitialScroll();

  // Track which section is currently visible
  const [activeSection, setActiveSection] = useState(0);

  // Globe settings based on current section
  const [globeProps, setGlobeProps] = useState({
    autoRotate: true,
    focusLocation: undefined as [number, number] | undefined,
    problems: GLOBAL_PROBLEMS,
    pulsatingProblems: false,
    fadeProblems: false,
    highlightCountry: null as "germany" | "usa" | null,
  });

  // Update globe settings when active section changes
  useEffect(() => {
    switch (activeSection) {
      case 0: // Hero section
        setGlobeProps({
          autoRotate: true,
          focusLocation: undefined,
          problems: GLOBAL_PROBLEMS,
          pulsatingProblems: false,
          fadeProblems: false,
          highlightCountry: null,
        });
        break;
      case 1: // World problems section
        setGlobeProps({
          autoRotate: false,
          focusLocation: undefined,
          problems: [...GERMANY_PROBLEMS, ...USA_PROBLEMS],
          pulsatingProblems: true,
          fadeProblems: false,
          highlightCountry: null,
        });
        break;
      case 2: // Politicians fail section
        setGlobeProps({
          autoRotate: false,
          focusLocation: undefined,
          problems: [...GERMANY_PROBLEMS, ...USA_PROBLEMS],
          pulsatingProblems: false,
          fadeProblems: true,
          highlightCountry: null,
        });
        break;
      case 3: // Germany focus section
        setGlobeProps({
          autoRotate: false,
          focusLocation: GERMANY_LOCATION,
          problems: GERMANY_PROBLEMS,
          pulsatingProblems: true,
          fadeProblems: false,
          highlightCountry: "germany",
        });
        break;
      case 4: // Problem cores section
        setGlobeProps({
          autoRotate: false,
          focusLocation: GERMANY_LOCATION,
          problems: GERMANY_PROBLEMS.map((problem) => {
            // Find which core problem this belongs to
            const coreGroup = CORE_PROBLEMS.find((core) =>
              core.problems.includes(problem.id),
            );

            if (coreGroup) {
              // Update color to match the core problem
              return {
                ...problem,
                color: coreGroup.color,
              };
            }
            return problem;
          }),
          pulsatingProblems: false,
          fadeProblems: false,
          highlightCountry: "germany",
        });
        break;
      case 5: // Core problems focus section
        // Start fading out the globe by setting opacity lower
        setGlobeProps({
          autoRotate: false,
          focusLocation: GERMANY_LOCATION,
          problems: GERMANY_PROBLEMS.map((problem) => {
            const coreGroup = CORE_PROBLEMS.find((core) =>
              core.problems.includes(problem.id),
            );

            if (coreGroup) {
              return {
                ...problem,
                color: coreGroup.color,
                size: problem.size * 0.7, // Smaller size as we transition away from the globe
              };
            }
            return {
              ...problem,
              size: problem.size * 0.7,
            };
          }),
          pulsatingProblems: false,
          fadeProblems: false,
          highlightCountry: "germany",
        });
        break;
      case 6: // Nexus Politics solution section
        setGlobeProps({
          autoRotate: true,
          focusLocation: undefined,
          problems: GLOBAL_PROBLEMS,
          pulsatingProblems: false,
          fadeProblems: false,
          highlightCountry: null,
        });
        break;
      default:
        // Default state
        setGlobeProps({
          autoRotate: true,
          focusLocation: undefined,
          problems: GLOBAL_PROBLEMS,
          pulsatingProblems: false,
          fadeProblems: false,
          highlightCountry: null,
        });
    }
  }, [activeSection]);

  return (
    <ScrollController heroHeight={100}>
      <main className="relative overflow-x-hidden bg-gradient-to-b from-[#0E191C] to-[#102C33] text-[#FBF3F1]">
        {/* Scroll indicator */}
        <ScrollIndicator />

        {/* Parallax globe that starts below hero and moves to center */}
        <ParallaxGlobe {...globeProps} activeSection={activeSection} />

        {/* Scroll sections */}

        {/* Hero Section */}
        <HeroSection onVisible={(visible) => visible && setActiveSection(0)} />

        {/* World Problems Section */}
        <ScrollSection
          id="world-problems"
          onVisible={(visible) => visible && setActiveSection(1)}
          className="relative z-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-4xl font-bold">
              Around the world, people in democracies have many problems with
              their governments
            </h2>
            <p className="text-xl text-[#C9DBFD]/80">
              From housing crises to transportation issues, citizens everywhere
              face challenges that need political attention.
            </p>
          </div>
        </ScrollSection>

        {/* Politicians Fail Section */}
        <ScrollSection
          id="politicians-fail"
          onVisible={(visible) => visible && setActiveSection(2)}
          className="relative z-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-4xl font-bold">
              Politicians fail to recognize, address and solve those problems
            </h2>
            <p className="text-xl text-[#C9DBFD]/80">
              The complexity and volume of issues can overwhelm even
              well-meaning representatives.
            </p>
          </div>
        </ScrollSection>

        {/* German Problems Section */}
        <ScrollSection
          id="german-focus"
          onVisible={(visible) => visible && setActiveSection(3)}
          className="relative z-10"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-4xl font-bold">
              Example: Local Problems in Germany
            </h2>

            <p className="mb-10 text-center text-xl text-[#C9DBFD]/80">
              Citizens across the country face diverse challenges that require
              political attention
            </p>

            <ProblemVisualization
              problems={GERMANY_PROBLEMS}
              groupedBy={CORE_PROBLEMS}
              phase="individual"
            />
          </div>
        </ScrollSection>

        {/* Problem Cores Section */}
        <ScrollSection
          id="problem-cores"
          onVisible={(visible) => visible && setActiveSection(4)}
          className="relative z-10"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl font-bold">
              Politicians lose track of too many different problems
            </h2>
            <p className="mb-12 text-center text-xl text-[#C9DBFD]/80">
              But often, these problems share common roots
            </p>

            <ProblemVisualization
              problems={GERMANY_PROBLEMS}
              groupedBy={CORE_PROBLEMS}
              phase="transition"
              showConnections={true}
            />
          </div>
        </ScrollSection>

        {/* Core Problems Focus */}
        <ScrollSection
          id="core-problems"
          onVisible={(visible) => visible && setActiveSection(5)}
          className="relative z-10"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl font-bold">
              Recognizing Common Core Issues
            </h2>
            <p className="mb-12 text-center text-xl text-[#C9DBFD]/80">
              When we organize problems by their root causes, we get a clearer
              picture
            </p>

            <ProblemVisualization
              problems={GERMANY_PROBLEMS}
              groupedBy={CORE_PROBLEMS}
              phase="grouped"
            />
          </div>
        </ScrollSection>

        {/* Nexus Politics Solution */}
        <ScrollSection
          id="solution"
          onVisible={(visible) => visible && setActiveSection(6)}
          className="relative z-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-4xl font-bold">
              Nexus Politics Makes Democracy Work Better
            </h2>
            <p className="mb-8 text-xl text-[#C9DBFD]/80">
              Nexus Politics enables politicians to identify the core issues
              behind many different citizen problems. This gives politicians a
              much clearer overview of the most important issues facing citizens
              today.
            </p>
            <button className="rounded-md bg-[#DA655E] px-8 py-4 text-lg font-semibold transition-colors hover:bg-[#9B3D3D]">
              Learn More
            </button>
          </div>
        </ScrollSection>

        {/* Features Section */}
        <section className="relative z-10 bg-[#0E191C] px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-4xl font-bold">
              Key Features
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-[#102C33] p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9DBFD]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      stroke="#102C33"
                      strokeWidth="2"
                    />
                    <path
                      d="M3 12H4M12 3V4M20 12H21M12 20V21M5.6 5.6L6.3 6.3M18.4 5.6L17.7 6.3M18.4 18.4L17.7 17.7M5.6 18.4L6.3 17.7"
                      stroke="#102C33"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Problem Clustering</h3>
                <p className="text-[#C9DBFD]/80">
                  Automatically identifies common root causes across seemingly
                  disparate issues.
                </p>
              </div>

              <div className="rounded-lg bg-[#102C33] p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#DA655E]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="#102C33"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Real-time Insights</h3>
                <p className="text-[#C9DBFD]/80">
                  Stay informed with up-to-date data on emerging citizen
                  concerns and priorities.
                </p>
              </div>

              <div className="rounded-lg bg-[#102C33] p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9DBFD]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10C3 8.89543 3.89543 8 5 8H6M12 12H12.01M8 12H8.01M16 12H16.01M12 3V15"
                      stroke="#102C33"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Direct Communication</h3>
                <p className="text-[#C9DBFD]/80">
                  Seamless connection between citizens and representatives on
                  the issues that matter most.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeaturesBentoGrid />
        <PricingSection />

        {/* Team section */}
        <section className="relative z-10 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-4xl font-bold">Our Team</h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((member) => (
                <div key={member} className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-[#C9DBFD]/20"></div>
                  <h3 className="text-xl font-bold">Team Member {member}</h3>
                  <p className="text-[#C9DBFD]/80">Co-Founder</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported By section */}
        <section className="relative z-10 bg-[#0E191C] px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center text-4xl font-bold">
              Supported By
            </h2>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[1, 2, 3, 4].map((partner) => (
                <div
                  key={partner}
                  className="flex h-24 items-center justify-center rounded-lg bg-[#102C33]/50"
                >
                  <div className="text-xl font-bold text-[#C9DBFD]/50">
                    Partner {partner}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-[#0E191C] py-24">
          <div>
            <h2 className="mx-auto mb-16 max-w-6xl px-4 text-center text-4xl font-bold">
              What other politicians say
            </h2>
            <Testimonials />
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-[#0E191C] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between border-t border-[#C9DBFD]/20 pt-8 md:flex-row">
              <div className="mb-4 text-[#C9DBFD]/60 md:mb-0">
                © 2025 Nexus Politics. All rights reserved.
              </div>
              <div className="flex space-x-8">
                <a href="#" className="text-[#C9DBFD]/60 hover:text-[#C9DBFD]">
                  Terms
                </a>
                <a href="#" className="text-[#C9DBFD]/60 hover:text-[#C9DBFD]">
                  Privacy
                </a>
                <a href="#" className="text-[#C9DBFD]/60 hover:text-[#C9DBFD]">
                  Imprint
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </ScrollController>
  );
}
