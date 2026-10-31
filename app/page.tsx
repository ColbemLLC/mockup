"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

// Tomorrow, Sun 1 Nov 2026, 4:00 PM CAT (UTC+2)
const RELEASE = new Date("2026-11-01T16:00:00+02:00").getTime();

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, RELEASE - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === null) return "--:--:--";
  const s = Math.floor(left / 1000);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

export default function Page() {
  const time = useCountdown();

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-cta px-6 text-center text-cta-foreground">
      <Image
        src="https://github.com/ColbemLLC.png"
        alt="Colbe"
        width={112}
        height={112}
        unoptimized
        priority
        className="rounded-full ring-4 ring-cta-foreground/90"
      />

      <h1 className="max-w-3xl font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.05] sm:text-7xl">
        We&apos;re tuning things up
        <br />
        <span className="italic opacity-60">right now.</span>
      </h1>

      <p className="max-w-md text-base opacity-80 sm:text-lg">
        Nothing is lost. We&apos;re making Colbe better and we&apos;ll be back
        tomorrow at 4:00 PM CAT.
      </p>

      <div className="font-mono text-3xl tabular-nums tracking-wider">
        {time}
      </div>

      <a
        href="https://github.com/ColbemLLC"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-nav bg-cta-foreground px-5 py-3 text-sm font-medium text-cta transition-opacity hover:opacity-90"
      >
        Follow updates
        <ArrowUpRight size={16} weight="bold" />
      </a>
    </main>
  );
}