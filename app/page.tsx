"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

// Mon 30 Nov 2026, 4:00 PM CAT (UTC+2)
const RELEASE = new Date("2026-11-30T16:00:00+02:00").getTime();

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, RELEASE - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === null) return { time: "--d --:--:--", done: false };
  const s = Math.floor(left / 1000);
  const d = Math.floor(s / 86400);
  const r = s % 86400;
  return {
    time: `${d}d ${pad(Math.floor(r / 3600))}:${pad(Math.floor((r % 3600) / 60))}:${pad(r % 60)}`,
    done: left === 0,
  };
}

export default function Page() {
  const { time, done } = useCountdown();

  return (
    <div className="fixed inset-0 isolate overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
      >
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -top-[14%] -left-[6%] h-[70%] w-[70%] rounded-full bg-chart-1 opacity-40 blur-3xl" />
        <div className="absolute top-[8%] right-[-8%] h-[62%] w-[62%] rounded-full bg-primary opacity-35 blur-3xl" />
        <div className="absolute bottom-[-22%] left-[12%] h-[66%] w-[66%] rounded-full bg-chart-3 opacity-30 blur-3xl" />
        <div className="absolute right-[20%] bottom-[-10%] h-[56%] w-[56%] rounded-full bg-accent opacity-80 blur-3xl" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.034]"
      />

      <main className="flex h-full flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-8 text-center">
        <Image
          src="/placeholder/maintenance.png"
          alt="Maintenance in progress"
          width={1910}
          height={931}
          priority
          className="h-auto w-full max-w-3xl rounded-card border border-border shadow-sm"
        />

        <h1 className="max-w-3xl font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.05] sm:text-6xl">
          We&apos;re tuning things up{" "}
          <span className="italic opacity-60">right now.</span>
        </h1>

        {done ? (
          <p className="max-w-md text-xl font-medium sm:text-2xl">
            Please wait! The launch will begin shortly
          </p>
        ) : (
          <>
            <p className="max-w-md text-base opacity-75 sm:text-lg">
              Nothing is lost. We&apos;re making Colbe better and we&apos;ll be
              back on November 30 at 4:00 PM CAT.
            </p>
            <div className="font-mono text-3xl tabular-nums tracking-wider">
              {time}
            </div>
          </>
        )}

        <a
          href="https://github.com/ColbemLLC"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-nav border border-border bg-foreground/5 px-5 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-foreground/10"
        >
          Follow updates
          <ArrowUpRight size={16} weight="bold" />
        </a>
      </main>
    </div>
  );
}