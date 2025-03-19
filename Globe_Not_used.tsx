"use client";

import createGlobe from "@nexus-politics/cobe";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { State, Marker } from "./types";

// Draggable & Auto Rotate Globe
// https://github.com/shuding/cobe

export default function Globe({
  rotation = false,
  focus = null,
  markers = [],
  activeSection = 0,
}: {
  rotation: boolean;
  focus: State | null;
  markers: Marker[];
  activeSection: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const markerElementsRef = useRef({});
  const [markerPositions, setMarkerPositions] = useState<
    ({
      id: number;
      position?: { x: number; y: number; z: number };
      visible: boolean;
    } & Partial<Marker>)[]
  >([]);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;
    let phi = 0;
    let lastUpdateTime = 0;

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    // Helper function to project 3D coordinates to 2D screen position
    const projectToScreen = (lat: number, lng: number, state: State) => {
      // Convert coordinates to radians
      const latitude = (lat * Math.PI) / 180;
      const longitude = (lng * Math.PI) / 180;

      // Apply rotation
      const x = Math.cos(latitude) * Math.sin(longitude + state.phi);
      const y = Math.sin(latitude);
      const z = Math.cos(latitude) * Math.cos(longitude + state.phi);

      // Check if point is visible (not on back side of globe)
      if (z < 0) return null;

      // Project to 2D screen coordinates
      const scale = width / 2; // Adjust based on globe size
      const projectedX = width / 2 + scale * x;
      const projectedY = width / 2 - scale * y;

      return { x: projectedX, y: projectedY, z };
    };

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.45,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0, 0.3, 1],
      markers,
      onRender: (state: any) => {
        // no rotation while dragging
        if (rotation && !pointerInteracting.current) {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          phi += 0.005;
        }

        // apply focus if provided
        if (focus) {
          state.phi = focus.phi;
          state.theta = focus.theta;
        } else {
          state.phi = phi + r.get();
        }
        state.width = width * 2;
        state.height = width * 2;

        // update marker positions periodically (reduce calculation frequency)
        const now = Date.now();
        if (now - lastUpdateTime > 10) {
          lastUpdateTime = now;

          // calc positions for all markers
          const positions = markers.map((marker, index) => {
            const [lng, lat] = marker.location;
            const screenPos = projectToScreen(lat, lng, state);

            if (screenPos) {
              // store calc positions
              return {
                id: index,
                position: screenPos,
                visible: true,
                ...marker,
              };
            }

            return { id: index, visible: false };
          });

          setMarkerPositions(positions);
        }
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 200);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rotation, focus, markers, activeSection]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-2xl mx-auto"
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

      {/* SVG overlay for marker connections */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {markerPositions
          .filter((marker) => marker.visible)
          .map((marker) => (
            <circle
              key={marker.id}
              cx={marker.position?.x}
              cy={marker.position?.y}
              r={5}
              fill={
                marker.color
                  ? `rgba(${marker.color[0] * 255}, ${marker.color[1] * 255}, ${marker.color[2] * 255}, 0.8)`
                  : "rgba(25, 204, 255, 0.8)"
              }
              className={marker.flickering ? "animate-pulse" : ""}
            />
          ))}
      </svg>
    </div>
  );
}
