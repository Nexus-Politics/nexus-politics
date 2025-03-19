"use client";

import createGlobe from "@nexus-politics/cobe";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";

export type Problem = {
  id: string;
  location: [number, number]; // longitude, latitude
  size: number;
  color?: [number, number, number]; // RGB values between 0-1
  text: string;
  category?:
    | "transportation"
    | "housing"
    | "education"
    | "healthcare"
    | "environment";
};

export type GlobeProps = {
  autoRotate?: boolean;
  focusLocation?: [number, number]; // longitude, latitude to focus on
  focusSpeed?: number; // speed to focus on the location (0-1)
  problems?: Problem[]; // problems to display on the globe
  pulsatingProblems?: boolean; // whether to make problems pulsate
  fadeProblems?: boolean; // whether to fade problems
  highlightCountry?: "germany" | "usa" | null; // which country to highlight
};

export default function EnhancedGlobe({
  autoRotate = true,
  focusLocation,
  focusSpeed = 0.01,
  problems = [],
  pulsatingProblems = false,
  fadeProblems = false,
  highlightCountry = null,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  // State for phi and theta targets (for smooth focusing)
  const [phiTarget, setPhiTarget] = useState<number | null>(null);
  const [thetaTarget, setThetaTarget] = useState<number | null>(null);

  // Map categories to colors
  const categoryColors = {
    transportation: [0.8, 0.2, 0.2], // red
    housing: [0.2, 0.8, 0.2], // green
    education: [0.2, 0.2, 0.8], // blue
    healthcare: [0.8, 0.8, 0.2], // yellow
    environment: [0.8, 0.2, 0.8], // purple
  };

  // Update phi/theta targets when focusLocation changes
  useEffect(() => {
    if (focusLocation) {
      // Convert lat/long to phi/theta
      const [long, lat] = focusLocation;
      // Convert to radians and set as targets
      setPhiTarget((long * Math.PI) / 180);
      setThetaTarget((lat * Math.PI) / 180);
    } else {
      setPhiTarget(null);
      setThetaTarget(null);
    }
  }, [focusLocation]);

  // Generate markers based on problems
  const getMarkers = () => {
    let markers = [...problems].map((problem) => ({
      location: problem.location,
      size:
        problem.size *
        (pulsatingProblems ? 0.8 + Math.sin(Date.now() * 0.005) * 0.2 : 1),
      color:
        problem.color ||
        (problem.category ? categoryColors[problem.category] : undefined),
    }));

    // Add special markers for country highlighting if needed
    if (highlightCountry === "germany") {
      // Add outline markers for Germany (these are approximations)
      markers = markers.concat([
        { location: [10.0, 54.0], size: 0.01 },
        { location: [12.0, 50.0], size: 0.01 },
        { location: [14.0, 53.0], size: 0.01 },
        { location: [9.0, 51.0], size: 0.01 },
        { location: [7.0, 54.0], size: 0.01 },
      ]);
    } else if (highlightCountry === "usa") {
      // Add outline markers for USA (these are approximations)
      markers = markers.concat([
        { location: [-122.4, 37.8], size: 0.01 },
        { location: [-74.0, 40.7], size: 0.01 },
        { location: [-87.6, 41.9], size: 0.01 },
        { location: [-95.4, 29.8], size: 0.01 },
        { location: [-118.2, 34.1], size: 0.01 },
      ]);
    }

    // Apply fading if needed
    if (fadeProblems) {
      markers = markers.map((marker) => ({
        ...marker,
        size: marker.size * 0.6 + Math.random() * 0.4, // Random flickering effect
      }));
    }

    return markers;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;
    let phi = 0;
    let theta = 0.3; // Initial theta

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: theta,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0.8, 0.2, 0.2],
      glowColor: [0.78, 0.85, 0.99],
      markers: getMarkers(),
      onRender: (state: any) => {
        // Handle phi (rotation around y-axis)
        if (phiTarget !== null) {
          // Smoothly interpolate toward the target
          const diff = phiTarget - phi;
          if (Math.abs(diff) > 0.01) {
            phi += diff * focusSpeed;
          } else {
            phi = phiTarget;
          }
        } else if (autoRotate && !pointerInteracting.current) {
          // Normal auto-rotation
          phi += 0.005;
        }

        // Handle theta (rotation around x-axis)
        if (thetaTarget !== null) {
          // Smoothly interpolate toward the target
          const diff = thetaTarget - theta;
          if (Math.abs(diff) > 0.01) {
            theta += diff * focusSpeed;
          } else {
            theta = thetaTarget;
          }
        }

        // Update state with current values + any pointer interaction
        state.phi = phi + r.get();
        state.theta = theta;
        state.width = width * 2;
        state.height = width * 2;

        // Update markers dynamically based on state
        state.markers = getMarkers();
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [
    autoRotate,
    focusSpeed,
    problems,
    pulsatingProblems,
    fadeProblems,
    highlightCountry,
  ]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
