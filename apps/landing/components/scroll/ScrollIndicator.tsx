"use client";

import React from "react";
import { useScroll } from "./ScrollController";

// TODO: how is this displayed
export default function ScrollIndicator() {
  const { scrollRatio } = useScroll();

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="h-32 w-1 bg-[#C9DBFD]/20 rounded-full overflow-hidden">
        <div
          className="w-full bg-[#C9DBFD] rounded-full transition-all duration-200"
          style={{
            height: `${scrollRatio * 100}%`,
            opacity: scrollRatio > 0 ? 1 : 0,
          }}
        ></div>
      </div>
    </div>
  );
}
