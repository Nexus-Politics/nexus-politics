import { Problem } from "@/components/globe/EnhancedGlobe";

// Germany coordinates
export const GERMANY_LOCATION: [number, number] = [10.4515, 51.1657];
// USA coordinates
export const USA_LOCATION: [number, number] = [-95.7129, 37.0902];

// Sample problems for Germany
export const GERMANY_PROBLEMS: Problem[] = [
  {
    id: "de-1",
    location: [13.405, 52.52], // Berlin
    size: 0.05,
    text: "Unaffordable housing in Berlin with increasing rent prices",
    category: "housing",
  },
  {
    id: "de-2",
    location: [9.9937, 53.5511], // Hamburg
    size: 0.04,
    text: "Inadequate public transportation connections to suburbs",
    category: "transportation",
  },
  {
    id: "de-3",
    location: [11.582, 48.1351], // Munich
    size: 0.05,
    text: "Overwhelmed healthcare system with long waiting times",
    category: "healthcare",
  },
  {
    id: "de-4",
    location: [8.6821, 50.1109], // Frankfurt
    size: 0.04,
    text: "Outdated school infrastructure and digital education gaps",
    category: "education",
  },
  {
    id: "de-5",
    location: [7.0159, 51.4556], // Ruhr area
    size: 0.05,
    text: "Environmental pollution from industrial sites",
    category: "environment",
  },
];

// Core problems after combining
export const CORE_PROBLEMS = [
  {
    id: "core-1",
    title: "Resource Distribution",
    description:
      "Inefficient allocation of public resources across regions and sectors",
    problems: ["de-1", "de-3", "de-4"],
    color: [0.6, 0.2, 0.8],
  },
  {
    id: "core-2",
    title: "Infrastructure Planning",
    description:
      "Lack of coordinated infrastructure planning for sustainable development",
    problems: ["de-2", "de-5"],
    color: [0.2, 0.7, 0.5],
  },
];

// USA problems for contrast
export const USA_PROBLEMS: Problem[] = [
  {
    id: "us-1",
    location: [-74.006, 40.7128], // New York
    size: 0.05,
    text: "Housing affordability crisis in urban centers",
    category: "housing",
  },
  {
    id: "us-2",
    location: [-122.4194, 37.7749], // San Francisco
    size: 0.04,
    text: "Homelessness and inadequate social services",
    category: "housing",
  },
  {
    id: "us-3",
    location: [-87.6298, 41.8781], // Chicago
    size: 0.04,
    text: "Underfunded public education in specific neighborhoods",
    category: "education",
  },
];

// Global problems for initial view
export const GLOBAL_PROBLEMS: Problem[] = [
  ...GERMANY_PROBLEMS.map((p) => ({ ...p, size: 0.03 })),
  ...USA_PROBLEMS.map((p) => ({ ...p, size: 0.03 })),
  // Add some additional dots around the world
  {
    id: "gb-1",
    location: [-0.1278, 51.5074], // London
    size: 0.03,
    text: "Housing crisis in major cities",
    category: "housing",
  },
  {
    id: "jp-1",
    location: [139.6917, 35.6895], // Tokyo
    size: 0.03,
    text: "Aging infrastructure and population",
    category: "environment",
  },
  {
    id: "au-1",
    location: [151.2093, -33.8688], // Sydney
    size: 0.03,
    text: "Climate change impacts on communities",
    category: "environment",
  },
  {
    id: "br-1",
    location: [-43.1729, -22.9068], // Rio
    size: 0.03,
    text: "Urban inequality and access to services",
    category: "transportation",
  },
];
