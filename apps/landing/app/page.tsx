'use client';
import Globe from '@/components/globe';
import { useState } from 'react';

export default function Home() {
  const [stage, setStage] = useState(0);
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-[32px] sm:items-start'>
        <Globe stage={stage} />
        <div className='flex gap-4'>
          <text>current stage {stage}</text>
          <button
            onClick={() => setStage(Math.max(0, stage - 1))}
            disabled={stage === 0}
            className='rounded-md border border-white/10 bg-black/20 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-black/30 disabled:opacity-50'
          >
            Previous
          </button>
          <button
            onClick={() => setStage(Math.min(3, stage + 1))}
            disabled={stage === 3}
            className='rounded-md border border-white/10 bg-black/20 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-black/30 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
