"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

interface Stage {
  autoRotate: boolean;
  location: [number, number] | null;
  scale: number;
}

interface GlobeProps {
  stage: number;
}

const doublePi = Math.PI * 2;

export default function Globe({ stage }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef<number>(0);

  // convert lat/long to phi/theta angles
  const locationToAngles = (lat: number, long: number): [number, number] => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };
  // view states
  const stages: Stage[] = [
    { autoRotate: true, location: null, scale: 1 },
    { autoRotate: false, location: [50, 10], scale: 1 },
    {
      autoRotate: false,
      location: [48.13734, 11.576138],
      scale: 1.8,
    },
    {
      autoRotate: false,
      location: [48.13734, 11.576138],
      scale: 3,
    },
  ];

  const stageRef = useRef<Stage>(stages[0]);

  useEffect(() => {
    if (!canvasRef.current || globeRef.current) return;

    const [initialPhi, initialTheta] = locationToAngles(
      ...(stages[0].location ?? [0, 0]),
    );
    const initialScale = stages[0].scale;
    const initialMapSamples = 32000;

    let currentPhi = initialPhi,
      currentTheta = initialTheta;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: initialPhi,
      theta: initialTheta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: initialMapSamples,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      scale: initialScale,
      markers: [
        {
          location: [37.7595, -122.4367],
          size: 0.03,
        },
        {
          location: [48.13734, 11.576138],
          size: 0.1,
        },
      ],
      onRender: (state) => {
        // apply current scale
        state.scale = stageRef.current.scale;
        state.mapSamples = initialMapSamples * state.scale;
        // state.mapBrightness = 6 / state.scale;
        // state.diffuse = 1.2 * state.scale;
        // state.mapBrightness = 6 / Math.sqrt(state.scale);
        // state.width = 600 * 2 * state.scale;
        // state.height = 600 * 2 * state.scale;

        if (stageRef.current.autoRotate) {
          state.phi = phiRef.current;
          phiRef.current += 0.005;
        } else if (stageRef.current.location) {
          state.phi = currentPhi;
          state.theta = currentTheta;

          const [focusPhi, focusTheta] = locationToAngles(
            ...stageRef.current.location,
          );

          const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
          const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

          // control the speed
          if (distPositive < distNegative) {
            currentPhi += distPositive * 0.08;
          } else {
            currentPhi -= distNegative * 0.08;
          }

          // smooth theta transition
          currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
        }
      },
    });

    globeRef.current = globe;

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    stageRef.current = { ...stages[stage] };
  }, [stage]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
    />
  );
}
