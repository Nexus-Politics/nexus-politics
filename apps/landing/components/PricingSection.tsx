"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

interface PricingFeature {
  title: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  audience: string;
  features: PricingFeature[];
  ctaText: string;
  highlighted?: boolean;
}

export default function PricingSection() {
  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: "0 €",
      description:
        "Essential tools for citizens to engage with local democracy",
      audience: "Citizens",
      features: [
        { title: "Submit new problems", included: true },
        { title: "Comment on existing problems", included: true },
        { title: "Upvote problems", included: true },
        { title: "Interact with problems", included: true },
        { title: "View basic problem statistics", included: true },
        { title: "Problem clustering insights", included: false },
        { title: "Constituent sentiment analysis", included: false },
        { title: "Geographic problem heatmaps", included: false },
      ],
      ctaText: "Sign Up Free",
    },
    {
      name: "Pro",
      price: "29 €",
      description:
        "Comprehensive analytics suite to identify core issues and trends",
      audience: "Politicians",
      features: [
        { title: "Submit new problems", included: true },
        { title: "Comment on existing problems", included: true },
        { title: "Upvote problems", included: true },
        { title: "Interact with problems", included: true },
        { title: "View basic problem statistics", included: true },
        { title: "Problem clustering insights", included: true },
        { title: "Constituent sentiment analysis", included: true },
        { title: "Geographic problem heatmaps", included: true },
      ],
      ctaText: "Start Pro Trial",
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.h2
            className="relative mb-4 inline-block text-4xl font-bold text-[#FBF3F1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
            <span className="absolute -right-16 top-0 rotate-12 transform rounded-md bg-[#DA655E] px-2 py-1 text-xs font-normal text-white">
              Coming Soon
            </span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-xl text-[#C9DBFD]/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Powerful analytics for politicians, free access for citizens
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`group overflow-hidden rounded-2xl transition-all duration-500 hover:translate-y-[-8px] hover:transform ${
                tier.highlighted
                  ? "border-2 border-[#DA655E] bg-gradient-to-b from-[#102C33] to-[#0E191C] hover:shadow-lg hover:shadow-[#DA655E]/20"
                  : "border border-[#C9DBFD]/20 bg-[#0E191C]/80 hover:border-[#C9DBFD]/60 hover:shadow-lg hover:shadow-[#C9DBFD]/10"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {tier.highlighted && (
                <div className="relative overflow-hidden bg-[#DA655E] py-2 text-center text-sm font-semibold text-white transition-all duration-300 group-hover:bg-[#9B3D3D]">
                  <span className="relative z-10">
                    RECOMMENDED FOR POLITICIANS
                  </span>
                  <div className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"></div>
                </div>
              )}

              <div className="relative p-8">
                {/* Animated background glow effect on hover */}
                <div
                  className={`absolute -inset-2 bg-[${tier.highlighted ? "#DA655E" : "#C9DBFD"}]/0 group-hover:bg-[${tier.highlighted ? "#DA655E" : "#C9DBFD"}]/5 -z-10 rounded-full opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100`}
                ></div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className={`text-2xl font-bold text-[#FBF3F1] ${tier.highlighted ? "group-hover:text-[#DA655E]" : "group-hover:text-[#C9DBFD]"} transition-colors duration-300`}
                    >
                      {tier.name}
                    </h3>
                    <p className="mt-1 text-[#C9DBFD]/70">
                      For {tier.audience}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="origin-right text-3xl font-bold text-[#FBF3F1] transition-all duration-300 group-hover:scale-110">
                      {tier.price}
                    </div>
                    <div className="text-sm text-[#C9DBFD]/70">per month</div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-[#C9DBFD]/80">
                  {tier.description}
                </p>

                <div className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <div key={feature.title} className="flex items-center">
                      <div
                        className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${
                          feature.included
                            ? tier.highlighted
                              ? "bg-[#DA655E] group-hover:scale-110 group-hover:bg-[#9B3D3D]"
                              : "bg-[#C9DBFD] group-hover:scale-110 group-hover:bg-[#C9DBFD]/80"
                            : "border border-[#C9DBFD]/30 bg-transparent"
                        }`}
                      >
                        {feature.included && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 6L5 9L10 3"
                              stroke={tier.highlighted ? "white" : "#0E191C"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`${feature.included ? "text-[#FBF3F1]" : "text-[#C9DBFD]/50"} ${feature.included ? "transition-transform duration-300 group-hover:translate-x-1" : ""}`}
                      >
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-8 w-full">
                  <button
                    className={`flex w-full cursor-not-allowed items-center justify-center rounded-lg px-6 py-3 font-semibold opacity-80 transition-all duration-300 ${
                      tier.highlighted
                        ? "bg-[#DA655E] text-white group-hover:shadow-md group-hover:shadow-[#DA655E]/30"
                        : "border border-[#C9DBFD]/30 bg-[#102C33] text-[#C9DBFD] group-hover:border-[#C9DBFD]/50"
                    }`}
                    disabled
                  >
                    {tier.ctaText}
                    <svg
                      className="ml-2 h-4 w-4 opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </button>

                  {/* Tooltip that appears on hover */}
                  <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 transform opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div
                      className={`${tier.highlighted ? "bg-[#9B3D3D]" : "bg-[#102C33]"} whitespace-nowrap rounded-lg px-4 py-2 text-sm text-white shadow-lg`}
                    >
                      {tier.highlighted
                        ? "Pro tier launching Q2 2025"
                        : "Public beta coming soon!"}
                      {/* Triangle pointing down */}
                      <div
                        className={`absolute bottom-0 left-1/2 h-4 w-4 ${tier.highlighted ? "bg-[#9B3D3D]" : "bg-[#102C33]"} -translate-x-1/2 translate-y-2 rotate-45 transform`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-4 text-xl font-bold text-[#FBF3F1]">
            Why Politicians Love Our Analytics
          </h3>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 text-left md:grid-cols-3">
            <div className="rounded-lg border border-[#C9DBFD]/10 bg-[#0E191C]/70 p-5">
              <h4 className="mb-2 font-bold text-[#DA655E]">
                Problem Clustering
              </h4>
              <p className="text-sm text-[#C9DBFD]/80">
                AI-powered algorithms identify common patterns across seemingly
                unrelated citizen issues, revealing core problems for more
                effective solutions.
              </p>
            </div>

            <div className="rounded-lg border border-[#C9DBFD]/10 bg-[#0E191C]/70 p-5">
              <h4 className="mb-2 font-bold text-[#DA655E]">
                Sentiment Analysis
              </h4>
              <p className="text-sm text-[#C9DBFD]/80">
                Track public sentiment around issues over time, identify
                emerging concerns, and measure the impact of your policy
                initiatives.
              </p>
            </div>

            <div className="rounded-lg border border-[#C9DBFD]/10 bg-[#0E191C]/70 p-5">
              <h4 className="mb-2 font-bold text-[#DA655E]">
                Geographic Insights
              </h4>
              <p className="text-sm text-[#C9DBFD]/80">
                Visualize problems across regions with interactive heatmaps to
                identify neighborhood-specific issues and allocate resources
                effectively.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-lg border border-[#C9DBFD]/10 bg-gradient-to-r from-[#102C33] via-[#0E191C] to-[#102C33] p-6">
            <h3 className="mb-3 text-center text-xl font-bold text-[#FBF3F1]">
              Join the Waitlist for Early Access
            </h3>
            <p className="mb-6 text-center text-[#C9DBFD]/80">
              We're currently in private beta. Sign up now to be among the first
              to experience Nexus Politics when we launch.
            </p>
            <div className="mx-auto w-full max-w-md">
              <WaitlistForm variant="inline" />
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-[#C9DBFD]/70">
            All plans include secure data handling and GDPR compliance. Need a
            custom solution for your municipality?
            <a href="#contact" className="ml-1 text-[#DA655E] hover:underline">
              Contact us
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Background decorative element */}
      <div className="absolute right-0 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 transform rounded-full bg-[#DA655E]/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-[#C9DBFD]/5 blur-3xl"></div>
    </section>
  );
}
