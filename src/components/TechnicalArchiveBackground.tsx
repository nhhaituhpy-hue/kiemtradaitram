"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TechnicalArchiveBackgroundProps {
  intensity?: number;
}

export default function TechnicalArchiveBackground({
  intensity = 1,
}: TechnicalArchiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 120 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Canvas drawing for technical aviation grid, radar sweeps, and archive drawer wireframes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let angle = 0;

    // Grid nodes representing technical flight station data nodes
    const nodes: { x: number; y: number; vx: number; vy: number; size: number; label: string }[] = [];
    const stationLabels = ["DVOR", "DME", "ADS-B", "NDB", "VHF", "RADAR", "SEC-84", "ATIS-M", "UPS-48V"];

    for (let i = 0; i < 18; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1.5,
        label: stationLabels[i % stationLabels.length],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.008;

      // 1. Draw subtle isometric technical grid lines with warm tea gold tone
      const gridSize = 64;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(224, 202, 172, 0.14)"; // Warm tea gold faint

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw subtle aviation radar ring with warm amber tea accents
      const drawRadar = (cx: number, cy: number, radius: number) => {
        ctx.save();
        ctx.translate(cx, cy);

        // Concentric rings
        ctx.strokeStyle = "rgba(245, 230, 211, 0.12)";
        ctx.lineWidth = 1;
        for (let r = 40; r <= radius; r += 50) {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Crosshairs
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(-radius, 0);
        ctx.lineTo(radius, 0);
        ctx.moveTo(0, -radius);
        ctx.lineTo(0, radius);
        ctx.stroke();
        ctx.setLineDash([]);

        // Sweep line
        ctx.strokeStyle = "rgba(230, 57, 70, 0.22)"; // Amber-red sweep
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.stroke();

        ctx.restore();
      };

      drawRadar(width * 0.85, height * 0.25, 140);
      drawRadar(width * 0.15, height * 0.75, 120);

      // 3. Draw connected technical nodes with labels
      ctx.fillStyle = "rgba(245, 222, 195, 0.45)";
      ctx.font = "9px monospace";

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();

        // Node label
        ctx.fillText(`[${n.label}]`, n.x + 6, n.y + 3);

        // Node connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(245, 222, 195, ${0.12 * (1 - dist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Dynamic 2D/3D Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* 3D Parallax Technical Filing Cabinet Isometric Units in Warm Tea Bronze (Left & Right Wings) */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          perspective: 1200,
        }}
        className="absolute inset-0 w-full h-full flex items-center justify-between px-8 md:px-20"
      >
        {/* Left Aviation File Rack Graphic */}
        <div className="hidden lg:flex flex-col gap-5 opacity-60 transform -rotate-y-12 translate-x-4">
          <div className="w-56 p-4 rounded-xl border border-[#7A6655] bg-[#3B2F27]/65 backdrop-blur-md shadow-lg space-y-2">
            <div className="flex items-center justify-between border-b border-[#635142] pb-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-200/90 tracking-wider">
                CABINET-A // TUH
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400/90 animate-pulse" />
            </div>
            <div className="space-y-1 text-[9px] font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">SECTOR:</span>
                <span className="text-amber-100 font-semibold">DVOR/DME TUY HÒA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">VAULT SYS:</span>
                <span className="text-blue-300 font-semibold">SECURE_256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">STATUS:</span>
                <span className="text-emerald-300 font-semibold">STANDBY</span>
              </div>
            </div>
            <div className="h-1 w-full bg-[#524134] rounded-full overflow-hidden">
              <div className="h-full bg-amber-500/70 w-3/4 rounded-full" />
            </div>
          </div>

          <div className="w-56 p-4 rounded-xl border border-[#7A6655] bg-[#3B2F27]/65 backdrop-blur-md shadow-lg space-y-2 translate-x-4">
            <div className="flex items-center justify-between border-b border-[#635142] pb-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-200/90 tracking-wider">
                ARCHIVE-B // SMS
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-400/90" />
            </div>
            <div className="space-y-1 text-[9px] font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">CHECKLIST:</span>
                <span className="text-amber-100 font-semibold">ATTECH_2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">LOG ENTRIES:</span>
                <span className="text-amber-100 font-semibold">1,420 RECORDS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Aviation File Rack Graphic */}
        <div className="hidden lg:flex flex-col gap-5 opacity-60 transform rotate-y-12 -translate-x-4 items-end">
          <div className="w-56 p-4 rounded-xl border border-[#7A6655] bg-[#3B2F27]/65 backdrop-blur-md shadow-lg space-y-2">
            <div className="flex items-center justify-between border-b border-[#635142] pb-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-200/90 tracking-wider">
                TELEMETRY // AIR-08
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-400/90 animate-pulse" />
            </div>
            <div className="space-y-1 text-[9px] font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">FREQ:</span>
                <span className="text-blue-300 font-semibold">117.0 MHz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">BEARING:</span>
                <span className="text-amber-100 font-semibold">249.51° TRUE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">SECURITY:</span>
                <span className="text-emerald-300 font-semibold">LOCKED</span>
              </div>
            </div>
            <div className="h-1 w-full bg-[#524134] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500/70 w-5/6 rounded-full" />
            </div>
          </div>

          <div className="w-56 p-4 rounded-xl border border-[#7A6655] bg-[#3B2F27]/65 backdrop-blur-md shadow-lg space-y-2 -translate-x-4">
            <div className="flex items-center justify-between border-b border-[#635142] pb-1.5">
              <span className="text-[10px] font-mono font-bold text-amber-200/90 tracking-wider">
                SAFETY // PCCC-ATTT
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400/90" />
            </div>
            <div className="space-y-1 text-[9px] font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">SYSTEM:</span>
                <span className="text-amber-100 font-semibold">ONLINE (STABLE)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">CALIBRATION:</span>
                <span className="text-amber-100 font-semibold">PASS 100%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top & Bottom Technical HUD Vignette Lines */}
      <div className="absolute top-6 left-8 right-8 flex items-center justify-between text-[10px] font-mono text-amber-200/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#e63946]" />
          <span>TUH TECHNICAL SECURE VAULT v2.6</span>
        </div>
        <div className="hidden sm:block">
          <span>LAT: 13°02&apos;56&quot;N / LON: 109°20&apos;01&quot;E [TUY HOA AIRPORT]</span>
        </div>
      </div>
    </div>
  );
}
