"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Problem } from "./globe/EnhancedGlobe";

interface ProblemProps {
  problem: Problem;
  isHighlighted: boolean;
  groupColor?: [number, number, number];
}

interface ProblemGroupProps {
  id: string;
  title: string;
  description: string;
  problems: string[];
  color: [number, number, number];
  allProblems: Problem[];
}

function ProblemCard({ problem, isHighlighted, groupColor }: ProblemProps) {
  // Convert RGB values from 0-1 to CSS color
  const getCategoryColor = (category?: string) => {
    if (groupColor) {
      const [r, g, b] = groupColor;
      return `rgba(${r * 255}, ${g * 255}, ${b * 255}, 0.8)`;
    }

    switch (problem.category) {
      case "transportation":
        return "rgba(218, 101, 94, 0.8)";
      case "housing":
        return "rgba(201, 219, 253, 0.8)";
      case "education":
        return "rgba(155, 61, 61, 0.8)";
      case "healthcare":
        return "rgba(16, 44, 51, 0.8)";
      case "environment":
        return "rgba(251, 243, 241, 0.8)";
      default:
        return "rgba(201, 219, 253, 0.8)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isHighlighted ? 1 : 0.7,
        scale: isHighlighted ? 1 : 0.95,
        y: isHighlighted ? 0 : 10,
      }}
      transition={{ duration: 0.5 }}
      className="problem-card p-4 rounded-lg"
      style={{
        backgroundColor: "rgba(14, 25, 28, 0.8)",
        borderLeft: `4px solid ${getCategoryColor(problem.category)}`,
      }}
    >
      <h3 className="text-lg font-semibold mb-2">
        {problem.id.split("-")[1] && `Problem ${problem.id.split("-")[1]}`}
      </h3>
      <p className="text-sm">{problem.text}</p>
    </motion.div>
  );
}

function ProblemGroup({
  id,
  title,
  description,
  problems,
  color,
  allProblems,
}: ProblemGroupProps) {
  // Find the actual problem objects from their IDs
  const groupProblems = allProblems.filter((p) => problems.includes(p.id));

  // Convert RGB values from 0-1 to CSS color
  const groupColorCSS = `rgba(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255}, 0.8)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="problem-card p-6 rounded-lg"
      style={{
        backgroundColor: "rgba(14, 25, 28, 0.8)",
        borderLeft: `4px solid ${groupColorCSS}`,
        borderTop: `1px solid ${groupColorCSS}`,
      }}
    >
      <h3 className="text-xl font-bold mb-3" style={{ color: groupColorCSS }}>
        {title}
      </h3>
      <p className="mb-4 text-[#FBF3F1]">{description}</p>

      <div className="space-y-2">
        {groupProblems.map((problem) => (
          <div
            key={problem.id}
            className="flex items-center text-sm text-[#C9DBFD]/70"
          >
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: groupColorCSS }}
            ></div>
            <p>{problem.text.split(" ").slice(0, 6).join(" ")}...</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface ProblemVisualizationProps {
  problems: Problem[];
  groupedBy: {
    id: string;
    title: string;
    description: string;
    problems: string[];
    color: [number, number, number];
  }[];
  showConnections?: boolean;
  phase: "individual" | "grouped" | "transition";
}

export default function ProblemVisualization({
  problems,
  groupedBy,
  showConnections = false,
  phase = "individual",
}: ProblemVisualizationProps) {
  const [highlightedProblems, setHighlightedProblems] = useState<string[]>([]);

  // Map problems to their group
  const problemToGroup = groupedBy.reduce(
    (acc, group) => {
      group.problems.forEach((problemId) => {
        acc[problemId] = group.id;
      });
      return acc;
    },
    {} as Record<string, string>,
  );

  // Get color for a problem based on its group
  const getProblemGroupColor = (problemId: string) => {
    const groupId = problemToGroup[problemId];
    if (groupId) {
      const group = groupedBy.find((g) => g.id === groupId);
      return group?.color;
    }
    return undefined;
  };

  // Highlight all problems in a group when hovering over the group
  const highlightGroup = (groupId: string) => {
    const group = groupedBy.find((g) => g.id === groupId);
    if (group) {
      setHighlightedProblems(group.problems);
    }
  };

  // Reset highlighting
  const resetHighlight = () => {
    setHighlightedProblems([]);
  };

  // Different layouts based on the phase
  if (phase === "grouped") {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groupedBy.map((group) => (
            <ProblemGroup
              key={group.id}
              id={group.id}
              title={group.title}
              description={group.description}
              problems={group.problems}
              color={group.color}
              allProblems={problems}
            />
          ))}
        </div>
      </div>
    );
  }

  if (phase === "transition") {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                isHighlighted={highlightedProblems.includes(problem.id)}
                groupColor={
                  phase === "transition"
                    ? getProblemGroupColor(problem.id)
                    : undefined
                }
              />
            ))}
          </div>

          <div className="space-y-6">
            {groupedBy.map((group) => (
              <motion.div
                key={group.id}
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(14, 25, 28, 0.8)",
                  borderLeft: `4px solid rgba(${group.color[0] * 255}, ${group.color[1] * 255}, ${group.color[2] * 255}, 0.8)`,
                }}
                onMouseEnter={() => highlightGroup(group.id)}
                onMouseLeave={resetHighlight}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-1">{group.title}</h3>
                <p className="text-sm text-[#C9DBFD]/70">{group.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default "individual" phase
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {problems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            isHighlighted={true}
          />
        ))}
      </div>
    </div>
  );
}
