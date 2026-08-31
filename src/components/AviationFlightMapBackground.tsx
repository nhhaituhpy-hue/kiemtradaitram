"use client";

import { useEffect, useRef } from "react";

const WORLD_MAP_ASSET = "/assets/maps/world-land-ne110m-v5.1.2.svg";
const WORLD_MAP_ASPECT_RATIO = 2;
const TARGET_FRAME_INTERVAL = 1000 / 30;

interface AirportHub {
  code: string;
  name: string;
  longitude: number;
  latitude: number;
  isLocal?: boolean;
}

interface FlightRoute {
  flightNo: string;
  from: string;
  to: string;
  progress: number;
  speed: number;
  color: string;
  aircraft: string;
}

interface MapFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

const HUBS: Record<string, AirportHub> = {
  // Vietnam
  TUH: { code: "TUH", name: "Tuy Hoa (VVTH)", longitude: 109.334, latitude: 13.05, isLocal: true },
  SGN: { code: "SGN", name: "Ho Chi Minh (VVTS)", longitude: 106.652, latitude: 10.819, isLocal: true },
  HAN: { code: "HAN", name: "Ha Noi (VVNB)", longitude: 105.807, latitude: 21.221, isLocal: true },
  DAD: { code: "DAD", name: "Da Nang (VVDN)", longitude: 108.199, latitude: 16.044, isLocal: true },

  // Asia-Pacific
  SIN: { code: "SIN", name: "Singapore (WSSS)", longitude: 103.992, latitude: 1.364 },
  BKK: { code: "BKK", name: "Bangkok (VTBS)", longitude: 100.75, latitude: 13.69 },
  NRT: { code: "NRT", name: "Tokyo (RJAA)", longitude: 140.392, latitude: 35.772 },
  ICN: { code: "ICN", name: "Seoul (RKSI)", longitude: 126.441, latitude: 37.46 },
  SYD: { code: "SYD", name: "Sydney (YSSY)", longitude: 151.175, latitude: -33.939 },

  // Middle East and Africa
  DXB: { code: "DXB", name: "Dubai (OMDB)", longitude: 55.365, latitude: 25.253 },
  DOH: { code: "DOH", name: "Doha (OTHH)", longitude: 51.608, latitude: 25.273 },
  CAI: { code: "CAI", name: "Cairo (HECA)", longitude: 31.406, latitude: 30.122 },
  JNB: { code: "JNB", name: "Johannesburg (FAOR)", longitude: 28.246, latitude: -26.139 },

  // Europe
  LHR: { code: "LHR", name: "London (EGLL)", longitude: -0.454, latitude: 51.47 },
  CDG: { code: "CDG", name: "Paris (LFPG)", longitude: 2.55, latitude: 49.01 },
  FRA: { code: "FRA", name: "Frankfurt (EDDF)", longitude: 8.562, latitude: 50.037 },

  // Americas
  JFK: { code: "JFK", name: "New York (KJFK)", longitude: -73.778, latitude: 40.641 },
  LAX: { code: "LAX", name: "Los Angeles (KLAX)", longitude: -118.409, latitude: 33.942 },
  SFO: { code: "SFO", name: "San Francisco (KSFO)", longitude: -122.379, latitude: 37.621 },
  GRU: { code: "GRU", name: "Sao Paulo (SBGR)", longitude: -46.473, latitude: -23.436 },
};

const FLIGHT_ROUTES: FlightRoute[] = [
  { flightNo: "HVN124", from: "TUH", to: "HAN", progress: 0.25, speed: 0.003, color: "#38bdf8", aircraft: "A321" },
  { flightNo: "HVN288", from: "TUH", to: "SGN", progress: 0.65, speed: 0.0032, color: "#38bdf8", aircraft: "A321" },
  { flightNo: "VJC302", from: "DAD", to: "TUH", progress: 0.85, speed: 0.0035, color: "#38bdf8", aircraft: "A320" },
  { flightNo: "ANA006", from: "NRT", to: "LAX", progress: 0.42, speed: 0.0012, color: "#38bdf8", aircraft: "B777" },
  { flightNo: "KAL017", from: "ICN", to: "SFO", progress: 0.18, speed: 0.0013, color: "#60a5fa", aircraft: "A350" },
  { flightNo: "HVN098", from: "SGN", to: "SFO", progress: 0.72, speed: 0.0011, color: "#38bdf8", aircraft: "B787" },
  { flightNo: "BAW117", from: "LHR", to: "JFK", progress: 0.55, speed: 0.0014, color: "#38bdf8", aircraft: "B777" },
  { flightNo: "AFR022", from: "CDG", to: "JFK", progress: 0.82, speed: 0.0013, color: "#818cf8", aircraft: "A350" },
  { flightNo: "DLH400", from: "FRA", to: "JFK", progress: 0.3, speed: 0.0014, color: "#60a5fa", aircraft: "B747" },
  { flightNo: "HVN037", from: "HAN", to: "FRA", progress: 0.6, speed: 0.001, color: "#38bdf8", aircraft: "B787" },
  { flightNo: "HVN011", from: "SGN", to: "CDG", progress: 0.38, speed: 0.001, color: "#818cf8", aircraft: "A350" },
  { flightNo: "UAE384", from: "SGN", to: "DXB", progress: 0.48, speed: 0.0015, color: "#38bdf8", aircraft: "A380" },
  { flightNo: "UAE001", from: "DXB", to: "LHR", progress: 0.7, speed: 0.0016, color: "#60a5fa", aircraft: "A380" },
  { flightNo: "QTR876", from: "HAN", to: "DOH", progress: 0.15, speed: 0.0015, color: "#38bdf8", aircraft: "B787" },
  { flightNo: "HVN773", from: "SGN", to: "SYD", progress: 0.33, speed: 0.0013, color: "#38bdf8", aircraft: "A350" },
  { flightNo: "SIA221", from: "SIN", to: "SYD", progress: 0.78, speed: 0.0014, color: "#60a5fa", aircraft: "B777" },
  { flightNo: "QFA021", from: "NRT", to: "SYD", progress: 0.52, speed: 0.0012, color: "#38bdf8", aircraft: "A330" },
  { flightNo: "UAE761", from: "DXB", to: "JNB", progress: 0.22, speed: 0.0013, color: "#818cf8", aircraft: "B777" },
  { flightNo: "MSR985", from: "CAI", to: "JFK", progress: 0.65, speed: 0.0011, color: "#60a5fa", aircraft: "B787" },
  { flightNo: "AAL903", from: "JFK", to: "GRU", progress: 0.4, speed: 0.0012, color: "#38bdf8", aircraft: "B777" },
  { flightNo: "AAL100", from: "LAX", to: "JFK", progress: 0.88, speed: 0.002, color: "#60a5fa", aircraft: "A321" },
];

const LATITUDES = [75, 60, 45, 30, 15, 0, -15, -30, -45, -60, -75];
const LONGITUDES = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];

function getMapFrame(viewportWidth: number, viewportHeight: number): MapFrame {
  if (viewportWidth / viewportHeight >= WORLD_MAP_ASPECT_RATIO) {
    const mapHeight = viewportWidth / WORLD_MAP_ASPECT_RATIO;
    return {
      x: 0,
      y: (viewportHeight - mapHeight) / 2,
      width: viewportWidth,
      height: mapHeight,
    };
  }

  const mapWidth = viewportHeight * WORLD_MAP_ASPECT_RATIO;
  return {
    x: (viewportWidth - mapWidth) / 2,
    y: 0,
    width: mapWidth,
    height: viewportHeight,
  };
}

function projectCoordinate(
  longitude: number,
  latitude: number,
  frame: MapFrame,
) {
  return {
    x: frame.x + ((longitude + 180) / 360) * frame.width,
    y: frame.y + ((90 - latitude) / 180) * frame.height,
  };
}

function formatLatitude(latitude: number) {
  if (latitude === 0) return "EQUATOR 00°";
  return `${Math.abs(latitude)}°${latitude > 0 ? "N" : "S"}`;
}

function formatLongitude(longitude: number) {
  if (longitude === 0) return "00° (UTC)";
  return `${Math.abs(longitude)}°${longitude > 0 ? "E" : "W"}`;
}

export default function AviationFlightMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const routes = FLIGHT_ROUTES.map((route) => ({ ...route }));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    let resizeFrameId = 0;
    let lastFrameTime = 0;
    let prefersReducedMotion = motionQuery.matches;

    const drawNavigationGrid = (frame: MapFrame) => {
      ctx.save();
      ctx.lineWidth = 0.5;
      ctx.font = "9px monospace";

      LATITUDES.forEach((latitude) => {
        const { y } = projectCoordinate(0, latitude, frame);
        if (y < 0 || y > height) return;

        const isEquator = latitude === 0;
        ctx.strokeStyle = isEquator
          ? "rgba(56, 189, 248, 0.28)"
          : "rgba(56, 189, 248, 0.09)";
        ctx.setLineDash(isEquator ? [] : [4, 6]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        ctx.fillStyle = "rgba(147, 197, 253, 0.45)";
        const label = formatLatitude(latitude);
        ctx.fillText(label, 12, y - 3);
        ctx.fillText(label, Math.max(12, width - 74), y - 3);
      });

      LONGITUDES.forEach((longitude) => {
        const { x } = projectCoordinate(longitude, 0, frame);
        if (x < 0 || x > width) return;

        const isPrimeMeridian = longitude === 0;
        ctx.strokeStyle = isPrimeMeridian
          ? "rgba(56, 189, 248, 0.28)"
          : "rgba(56, 189, 248, 0.09)";
        ctx.setLineDash(isPrimeMeridian ? [] : [4, 6]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        ctx.fillStyle = "rgba(147, 197, 253, 0.4)";
        const label = formatLongitude(longitude);
        ctx.fillText(label, x + 4, 18);
        ctx.fillText(label, x + 4, height - 12);
      });

      ctx.setLineDash([]);
      ctx.restore();
    };

    const drawFlightRoutes = (frame: MapFrame, advanceFactor: number) => {
      routes.forEach((route) => {
        const fromHub = HUBS[route.from];
        const toHub = HUBS[route.to];
        if (!fromHub || !toHub) return;

        const start = projectCoordinate(fromHub.longitude, fromHub.latitude, frame);
        const end = projectCoordinate(toHub.longitude, toHub.latitude, frame);
        const distance = Math.hypot(end.x - start.x, end.y - start.y);
        if (distance < 1) return;

        const midpointX = (start.x + end.x) / 2;
        const midpointY = (start.y + end.y) / 2;
        const directionX = end.x - start.x;
        const directionY = end.y - start.y;
        const normalX = -directionY / distance;
        const normalY = directionX / distance;
        const arcHeight = Math.min(distance * 0.26, Math.max(100, width * 0.075));
        const controlX = midpointX + normalX * arcHeight;
        const controlY = midpointY + normalY * arcHeight - 20;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.18)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (advanceFactor > 0) {
          route.progress += route.speed * advanceFactor;
          if (route.progress > 1) route.progress %= 1;
        }

        const t = route.progress;
        const inverseT = 1 - t;
        const planeX =
          inverseT * inverseT * start.x +
          2 * inverseT * t * controlX +
          t * t * end.x;
        const planeY =
          inverseT * inverseT * start.y +
          2 * inverseT * t * controlY +
          t * t * end.y;
        const tangentX =
          2 * inverseT * (controlX - start.x) +
          2 * t * (end.x - controlX);
        const tangentY =
          2 * inverseT * (controlY - start.y) +
          2 * t * (end.y - controlY);
        const heading = Math.atan2(tangentY, tangentX);

        ctx.fillStyle = `${route.color}2e`;
        ctx.beginPath();
        ctx.arc(planeX, planeY, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(planeX, planeY);
        ctx.rotate(heading);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-5, -4);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-5, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.font = "8px monospace";
        ctx.fillStyle = "rgba(186, 230, 253, 0.85)";
        ctx.fillText(route.flightNo, planeX + 8, planeY - 4);
      });
    };

    const drawAirportHubs = (frame: MapFrame) => {
      Object.values(HUBS).forEach((hub) => {
        const { x, y } = projectCoordinate(hub.longitude, hub.latitude, frame);
        if (x < -16 || x > width + 16 || y < -16 || y > height + 16) return;

        ctx.beginPath();
        ctx.arc(x, y, hub.isLocal ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = hub.isLocal ? "#38bdf8" : "#93c5fd";
        ctx.fill();

        if (hub.isLocal) {
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.font = hub.isLocal ? "bold 10px monospace" : "9px monospace";
        ctx.fillStyle = hub.isLocal
          ? "#38bdf8"
          : "rgba(224, 242, 254, 0.75)";
        ctx.fillText(hub.code, x + 8, y - 5);
      });
    };

    const drawScene = (advanceFactor: number) => {
      ctx.clearRect(0, 0, width, height);
      const frame = getMapFrame(width, height);
      drawNavigationGrid(frame);
      drawFlightRoutes(frame, advanceFactor);
      drawAirportHubs(frame);
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.round(width));
      canvas.height = Math.max(1, Math.round(height));
      drawScene(0);
    };

    const animate = (timestamp: number) => {
      if (document.hidden || prefersReducedMotion) return;
      animationFrameId = requestAnimationFrame(animate);

      if (lastFrameTime === 0) {
        lastFrameTime = timestamp;
        return;
      }

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < TARGET_FRAME_INTERVAL) return;

      const advanceFactor = Math.min(elapsed / (1000 / 60), 4);
      lastFrameTime = timestamp - (elapsed % TARGET_FRAME_INTERVAL);
      drawScene(advanceFactor);
    };

    const startAnimation = () => {
      cancelAnimationFrame(animationFrameId);
      lastFrameTime = 0;
      drawScene(0);

      if (!document.hidden && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(resizeCanvas);
    };

    const handleVisibilityChange = () => {
      startAnimation();
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      startAnimation();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    resizeCanvas();
    startAnimation();

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full select-none overflow-hidden bg-gradient-to-b from-[#070D1E] via-[#0B1736] to-[#060A17] pointer-events-none"
    >
      {/* Accurate, cacheable Natural Earth coastline layer. */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url("${WORLD_MAP_ASSET}")` }}
      />

      {/* Lightweight animated air-traffic and navigation layer. */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />

      <div className="absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute bottom-10 right-1/4 h-[400px] w-[600px] rounded-full bg-cyan-500/8 blur-[120px]" />

      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between font-mono text-[9px] text-blue-300/50">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 motion-safe:animate-ping" />
          <span>GLOBAL AIRSPACE SURVEILLANCE // ATTECH - TUH</span>
        </div>
        <div className="hidden md:block">
          <span>CENTER: 13°02&apos;56&quot;N 109°20&apos;01&quot;E [TUY HOA CNS/ATM]</span>
        </div>
      </div>
    </div>
  );
}
