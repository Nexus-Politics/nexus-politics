import React from "react";
import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black">
      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-5xl">
        <div className="w-full aspect-square max-w-2xl my-8">
          <Globe />
        </div>
      </div>
    </main>
  );
}
