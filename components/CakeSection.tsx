"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cake,
  Flame,
  Wind,
  Camera,
  CameraOff,
  RotateCcw,
  Sparkles,
  Utensils,
  Heart,
} from "lucide-react";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import { triggerFireworks, triggerHeartBurst } from "@/lib/confetti";

interface FlavorConfig {
  id: string;
  label: string;
  emoji: string;
  swatch: string;
  topBase: string;
  topHighlight: string;
  bottomBase: string;
  bottomHighlight: string;
  dripColor: string;
  frostingTrim: string;
  plaqueBg: string;
  plaqueText: string;
  sprinkles: string[];
}

const CAKE_FLAVORS: FlavorConfig[] = [
  {
    id: "strawberry",
    label: "Kem Dâu Hồng",
    emoji: "🍓",
    swatch: "bg-rose-400",
    topBase: "#fda4af",
    topHighlight: "#ffe4e6",
    bottomBase: "#fb7185",
    bottomHighlight: "#fecdd3",
    dripColor: "#e11d48",
    frostingTrim: "#fff1f2",
    plaqueBg: "#fffdf9",
    plaqueText: "#9f1239",
    sprinkles: ["#ffffff", "#fbbf24", "#be123c", "#f43f5e"],
  },
  {
    id: "matcha",
    label: "Trà Xanh Ngọc",
    emoji: "🍵",
    swatch: "bg-teal-500",
    topBase: "#5eead4",
    topHighlight: "#ccfbf1",
    bottomBase: "#14b8a6",
    bottomHighlight: "#99f6e4",
    dripColor: "#0f766e",
    frostingTrim: "#f0fdfa",
    plaqueBg: "#fffdf9",
    plaqueText: "#115e59",
    sprinkles: ["#fef3c7", "#fbbf24", "#ffffff", "#0d9488"],
  },
  {
    id: "vanilla",
    label: "Vani Hoàng Kim",
    emoji: "🍯",
    swatch: "bg-amber-400",
    topBase: "#fde68a",
    topHighlight: "#fef9c3",
    bottomBase: "#fcd34d",
    bottomHighlight: "#fef3c7",
    dripColor: "#d97706",
    frostingTrim: "#fffbeb",
    plaqueBg: "#fffdf9",
    plaqueText: "#92400e",
    sprinkles: ["#f43f5e", "#f59e0b", "#ffffff", "#ec4899"],
  },
  {
    id: "chocolate",
    label: "Socola Ngọt Ngào",
    emoji: "🍫",
    swatch: "bg-amber-900",
    topBase: "#92400e",
    topHighlight: "#b45309",
    bottomBase: "#78350f",
    bottomHighlight: "#92400e",
    dripColor: "#451a03",
    frostingTrim: "#fef3c7",
    plaqueBg: "#fffbeb",
    plaqueText: "#78350f",
    sprinkles: ["#fbbf24", "#fda4af", "#ffffff", "#f43f5e"],
  },
];

const CANDLE_POSITIONS = [
  { x: 145, y: 118, color: "#fb7185", stripe: "#ffe4e6" },
  { x: 182, y: 110, color: "#fbbf24", stripe: "#fef3c7" },
  { x: 220, y: 106, color: "#14b8a6", stripe: "#ccfbf1" },
  { x: 258, y: 110, color: "#f43f5e", stripe: "#fecdd3" },
  { x: 295, y: 118, color: "#f59e0b", stripe: "#fde68a" },
];

const SPRINKLE_COORDS = [
  { x: 140, y: 168, rot: 20 },
  { x: 165, y: 180, rot: -35 },
  { x: 195, y: 170, rot: 45 },
  { x: 225, y: 184, rot: -15 },
  { x: 255, y: 172, rot: 60 },
  { x: 285, y: 180, rot: -45 },
  { x: 120, y: 248, rot: 30 },
  { x: 155, y: 262, rot: -25 },
  { x: 285, y: 262, rot: 25 },
  { x: 318, y: 248, rot: -40 },
];

export default function CakeSection() {
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>("strawberry");
  const [litCandles, setLitCandles] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [cakeMessage, setCakeMessage] = useState<string>("Tri Ân Cô Giang 20/11");
  const [sliceTaken, setSliceTaken] = useState<boolean>(false);
  const [celebrated, setCelebrated] = useState<boolean>(false);
  const [camActive, setCamActive] = useState<boolean>(false);
  const [camLoading, setCamLoading] = useState<boolean>(false);
  const [camError, setCamError] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
  const [puckerLevel, setPuckerLevel] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const flavor =
    CAKE_FLAVORS.find((item) => item.id === selectedFlavorId) ?? CAKE_FLAVORS[0];

  const litCount = litCandles.filter(Boolean).length;
  const allBlownOut = litCount === 0;

  const stopCamera = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCamActive(false);
    setCamLoading(false);
    setFaceDetected(false);
    setPuckerLevel(0);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
    };
  }, [stopCamera]);

  const blowOutAll = useCallback(() => {
    setLitCandles([false, false, false, false, false]);
    if (!celebrated) {
      setCelebrated(true);
      triggerFireworks();
    } else {
      triggerHeartBurst();
    }
    stopCamera();
  }, [celebrated, stopCamera]);

  const toggleCandle = (index: number) => {
    setLitCandles((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      const remaining = next.filter(Boolean).length;
      if (remaining === 0 && prev.some(Boolean)) {
        setTimeout(() => {
          triggerFireworks();
          setCelebrated(true);
        }, 120);
      }
      return next;
    });
  };

  const relightCandles = () => {
    setLitCandles([true, true, true, true, true]);
    setSliceTaken(false);
  };

  const handleCutSlice = () => {
    setSliceTaken((prev) => {
      const next = !prev;
      if (next) {
        triggerHeartBurst();
      }
      return next;
    });
  };

  const getFaceLandmarker = async (): Promise<FaceLandmarker> => {
    if (landmarkerRef.current) return landmarkerRef.current;

    const { FilesetResolver, FaceLandmarker: FaceLandmarkerClass } =
      await import("@mediapipe/tasks-vision");
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.3/wasm"
    );

    const modelAssetPath =
      "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

    try {
      landmarkerRef.current = await FaceLandmarkerClass.createFromOptions(
        vision,
        {
          baseOptions: { modelAssetPath, delegate: "GPU" },
          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: true,
        }
      );
    } catch {
      landmarkerRef.current = await FaceLandmarkerClass.createFromOptions(
        vision,
        {
          baseOptions: { modelAssetPath, delegate: "CPU" },
          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: true,
        }
      );
    }

    return landmarkerRef.current;
  };

  const toggleCamera = async () => {
    if (camActive || camLoading) {
      stopCamera();
      return;
    }

    setCamError(null);
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setCamError(
        "Trình duyệt không hỗ trợ camera, bạn bấm nút Thổi Nến nhé!"
      );
      return;
    }

    setCamLoading(true);
    try {
      const [stream, landmarker] = await Promise.all([
        navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 480 },
            height: { ideal: 360 },
          },
          audio: false,
        }),
        getFaceLandmarker(),
      ]);

      streamRef.current = stream;
      setCamActive(true);
      setCamLoading(false);

      // Wait a tick for <video> to mount
      await new Promise((r) => setTimeout(r, 50));
      const videoEl = videoRef.current;
      if (!videoEl) {
        stopCamera();
        return;
      }
      videoEl.srcObject = stream;
      await videoEl.play();

      let lastVideoTime = -1;
      let lastFrameAt = performance.now();
      let puckerHoldMs = 0;
      const REQUIRED_PUCKER_MS = 400;

      const detectPucker = (now: number) => {
        if (!streamRef.current || !videoRef.current) return;

        const dt = Math.min(60, Math.max(0, now - lastFrameAt));
        lastFrameAt = now;

        const video = videoRef.current;
        if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
          lastVideoTime = video.currentTime;
          const result = landmarker.detectForVideo(video, now);
          const categories = result.faceBlendshapes?.[0]?.categories;

          if (categories && categories.length > 0) {
            setFaceDetected(true);
            const pucker =
              categories.find((c) => c.categoryName === "mouthPucker")
                ?.score ?? 0;
            const funnel =
              categories.find((c) => c.categoryName === "mouthFunnel")
                ?.score ?? 0;

            const combined = Math.max(pucker, funnel * 0.9);
            const isPuckering = combined > 0.42;

            if (isPuckering) {
              puckerHoldMs += dt;
            } else {
              puckerHoldMs = Math.max(0, puckerHoldMs - dt * 1.4);
            }

            const holdPct = Math.min(
              100,
              Math.round((puckerHoldMs / REQUIRED_PUCKER_MS) * 100)
            );
            const instantPct = Math.min(100, Math.round((combined / 0.6) * 75));
            setPuckerLevel(Math.max(holdPct, instantPct));

            if (puckerHoldMs >= REQUIRED_PUCKER_MS) {
              blowOutAll();
              return;
            }
          } else {
            setFaceDetected(false);
            puckerHoldMs = Math.max(0, puckerHoldMs - dt * 1.5);
            setPuckerLevel(0);
          }
        }

        rafRef.current = requestAnimationFrame(detectPucker);
      };

      rafRef.current = requestAnimationFrame(detectPucker);
    } catch {
      setCamError(
        "Không mở được camera hoặc chưa cấp quyền — bạn có thể chạm vào từng ngọn nến hoặc nhấn nút Thổi Nến!"
      );
      stopCamera();
    }
  };

  return (
    <section
      id="cake"
      className="py-24 bg-gradient-to-b from-amber-50/40 via-rose-50/40 to-white relative overflow-hidden"
    >
      {/* Subtle decorative glows */}
      <div className="absolute top-12 right-12 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider">
            <Cake className="w-3.5 h-3.5 text-rose-500" />
            <span>Bánh Kem Ảo 20/11</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Chiếc Bánh Kem Gửi Tặng Cô
          </h2>

          <p className="text-stone-600 text-base">
            Chọn vị kem yêu thích, viết dòng chữ lên bánh, rồi chạm vào từng ngọn nến (hoặc chu mỏ trước camera) để mở màn chúc mừng!
          </p>
        </div>

        {/* Main Interactive Card */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-rose-100 shadow-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive SVG Cake Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[440px] aspect-[440/370] flex items-center justify-center">
              {/* Warm ambient glow when candles are lit */}
              <motion.div
                animate={{
                  opacity: litCount > 0 ? 0.35 + litCount * 0.08 : 0,
                  scale: litCount > 0 ? 1 : 0.85,
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 w-64 h-40 rounded-full bg-amber-300/40 blur-3xl pointer-events-none"
              />

              <svg
                viewBox="0 0 440 370"
                className="w-full h-full drop-shadow-xl select-none"
                role="img"
                aria-label="Bánh kem 20/11 tương tác"
              >
                <defs>
                  <linearGradient id="plateGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f5f5f4" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e7e5e4" />
                  </linearGradient>
                  <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="55%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#fef9c3" />
                  </linearGradient>
                </defs>

                {/* Cake Stand / Plate */}
                <ellipse cx="220" cy="336" rx="165" ry="22" fill="#d6d3d1" opacity="0.45" />
                <path
                  d="M 190 318 L 250 318 L 265 336 L 175 336 Z"
                  fill="#e7e5e4"
                />
                <ellipse
                  cx="220"
                  cy="314"
                  rx="172"
                  ry="24"
                  fill="url(#plateGrad)"
                  stroke="#e7e5e4"
                  strokeWidth="2"
                />

                {/* Bottom Tier */}
                <g>
                  <path
                    d="M 85 215 L 85 296 C 85 312 355 312 355 296 L 355 215 Z"
                    fill={flavor.bottomBase}
                  />
                  {/* Highlight band */}
                  <path
                    d="M 105 232 L 105 290 C 105 296 140 301 155 302 L 155 232 Z"
                    fill={flavor.bottomHighlight}
                    opacity="0.35"
                  />
                  {/* Bottom tier top surface */}
                  <ellipse
                    cx="220"
                    cy="215"
                    rx="135"
                    ry="24"
                    fill={flavor.bottomHighlight}
                  />
                  {/* Chocolate/Cream Drips on Bottom Tier */}
                  <path
                    d="M 85 215 C 85 235, 110 255, 118 242 C 126 230, 134 264, 146 254 C 158 244, 165 232, 180 245 C 195 258, 208 232, 222 246 C 236 260, 248 234, 262 248 C 276 262, 288 234, 302 250 C 316 265, 330 236, 342 246 C 350 252, 355 232, 355 215 Z"
                    fill={flavor.dripColor}
                    opacity="0.88"
                  />
                  {/* Bottom frosting pearls */}
                  {Array.from({ length: 15 }).map((_, idx) => {
                    const t = idx / 14;
                    const px = 94 + t * 252;
                    const py = 300 + Math.sin(t * Math.PI) * 10;
                    return (
                      <circle
                        key={`pearl-b-${idx}`}
                        cx={px}
                        cy={py}
                        r="7"
                        fill={flavor.frostingTrim}
                      />
                    );
                  })}
                </g>

                {/* Name Plaque on Bottom Tier */}
                <g transform="translate(220, 272)">
                  <rect
                    x="-92"
                    y="-18"
                    width="184"
                    height="34"
                    rx="10"
                    fill={flavor.plaqueBg}
                    stroke="#fbbf24"
                    strokeWidth="2"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={flavor.plaqueText}
                    fontSize="13"
                    fontWeight="700"
                    className="font-playfair"
                  >
                    {cakeMessage.trim() ? cakeMessage.slice(0, 24) : "Tri Ân 20/11"}
                  </text>
                </g>

                {/* Top Tier */}
                <g>
                  <path
                    d="M 122 135 L 122 204 C 122 218 318 218 318 204 L 318 135 Z"
                    fill={flavor.topBase}
                  />
                  <path
                    d="M 136 146 L 136 198 C 136 203 162 207 174 208 L 174 146 Z"
                    fill={flavor.topHighlight}
                    opacity="0.4"
                  />
                  {/* Top tier roof */}
                  <ellipse
                    cx="220"
                    cy="135"
                    rx="98"
                    ry="19"
                    fill={flavor.topHighlight}
                  />
                  {/* Top tier drips */}
                  <path
                    d="M 122 135 C 122 152, 138 172, 148 160 C 158 148, 168 178, 180 165 C 192 152, 204 148, 218 164 C 232 180, 244 150, 258 162 C 272 174, 286 150, 298 162 C 308 172, 318 152, 318 135 Z"
                    fill={flavor.dripColor}
                    opacity="0.9"
                  />
                  {/* Middle frosting pearls */}
                  {Array.from({ length: 11 }).map((_, idx) => {
                    const t = idx / 10;
                    const px = 128 + t * 184;
                    const py = 207 + Math.sin(t * Math.PI) * 8;
                    return (
                      <circle
                        key={`pearl-t-${idx}`}
                        cx={px}
                        cy={py}
                        r="6"
                        fill={flavor.frostingTrim}
                      />
                    );
                  })}
                </g>

                {/* Sprinkles */}
                {SPRINKLE_COORDS.map((sp, idx) => (
                  <rect
                    key={`sp-${idx}`}
                    x={sp.x}
                    y={sp.y}
                    width="8"
                    height="3.2"
                    rx="1.6"
                    fill={flavor.sprinkles[idx % flavor.sprinkles.length]}
                    transform={`rotate(${sp.rot} ${sp.x + 4} ${sp.y + 1.6})`}
                  />
                ))}

                {/* Interactive Candles */}
                {CANDLE_POSITIONS.map((candle, idx) => {
                  const isLit = litCandles[idx];
                  return (
                    <g
                      key={`candle-${idx}`}
                      transform={`translate(${candle.x}, ${candle.y})`}
                      onClick={() => toggleCandle(idx)}
                      className="cursor-pointer group"
                    >
                      {/* Invisible larger hit target */}
                      <rect x="-14" y="-58" width="28" height="82" fill="transparent" />

                      {/* Candle Stick */}
                      <rect
                        x="-5.5"
                        y="-26"
                        width="11"
                        height="34"
                        rx="3"
                        fill={candle.color}
                      />
                      <path
                        d="M -5.5 -14 L 5.5 -20 M -5.5 -4 L 5.5 -10"
                        stroke={candle.stripe}
                        strokeWidth="2.5"
                      />
                      {/* Wick */}
                      <line
                        x1="0"
                        y1="-26"
                        x2="0"
                        y2="-33"
                        stroke="#44403c"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />

                      {/* Flame or Smoke */}
                      <AnimatePresence mode="wait">
                        {isLit ? (
                          <motion.g
                            key="flame"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: [1, 1.08, 0.96, 1.05, 1],
                              rotate: [-2, 2.5, -1.5, 2, 0],
                              opacity: 1,
                            }}
                            exit={{ scale: 0, opacity: 0, y: -6 }}
                            transition={{
                              scale: {
                                repeat: Infinity,
                                duration: 1.4 + idx * 0.15,
                                ease: "easeInOut",
                              },
                              rotate: {
                                repeat: Infinity,
                                duration: 1.1 + idx * 0.12,
                                ease: "easeInOut",
                              },
                            }}
                          >
                            {/* Halo */}
                            <circle
                              cx="0"
                              cy="-44"
                              r="14"
                              fill="#fde047"
                              opacity="0.28"
                            />
                            {/* Outer Flame */}
                            <path
                              d="M 0 -58 C 7 -49, 8 -39, 0 -33 C -8 -39, -7 -49, 0 -58 Z"
                              fill="url(#flameGrad)"
                            />
                            {/* Inner Core */}
                            <path
                              d="M 0 -48 C 3 -43, 3.5 -38, 0 -35 C -3.5 -38, -3 -43, 0 -48 Z"
                              fill="#ffffff"
                              opacity="0.85"
                            />
                          </motion.g>
                        ) : (
                          <motion.g
                            key="smoke"
                            initial={{ opacity: 0.75, y: 0 }}
                            animate={{ opacity: 0, y: -24 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                          >
                            <path
                              d="M 0 -34 Q -5 -42 1 -50 Q 6 -56 0 -64"
                              fill="none"
                              stroke="#a8a29e"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </motion.g>
                        )}
                      </AnimatePresence>
                    </g>
                  );
                })}

                {/* Cut Slice Overlay */}
                <AnimatePresence>
                  {sliceTaken && (
                    <motion.g
                      initial={{ opacity: 0, x: 0, y: -15, scale: 0.85 }}
                      animate={{ opacity: 1, x: 38, y: 12, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    >
                      {/* Little plate + slice on the right side */}
                      <ellipse
                        cx="352"
                        cy="322"
                        rx="42"
                        ry="11"
                        fill="#ffffff"
                        stroke="#e7e5e4"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 326 306 L 376 312 L 352 284 Z"
                        fill={flavor.topHighlight}
                      />
                      <path
                        d="M 326 306 L 376 312 L 376 323 L 326 318 Z"
                        fill={flavor.bottomBase}
                      />
                      <path
                        d="M 326 311 L 376 317"
                        stroke={flavor.frostingTrim}
                        strokeWidth="3"
                      />
                      <circle cx="352" cy="291" r="4.5" fill="#e11d48" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </div>

            {/* Status / Celebration Banner */}
            <AnimatePresence mode="wait">
              {allBlownOut ? (
                <motion.div
                  key="celebration"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-teal-50 border border-rose-200 text-center shadow-sm"
                >
                  <p className="font-playfair font-bold text-rose-700 text-base sm:text-lg flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Chúc Cô Ma Ngân Giang 20/11 Rực Rỡ &amp; Tràn Ngập Hạnh Phúc!</span>
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-xs sm:text-sm text-stone-500 text-center"
                >
                  Còn <strong className="text-rose-600">{litCount}/5</strong> ngọn nến đang cháy — chạm vào từng ngọn nến để thổi nhé!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Controls & Customization */}
          <div className="lg:col-span-5 space-y-6">
            {/* Flavor Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                1. Chọn hương vị bánh kem
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {CAKE_FLAVORS.map((item) => {
                  const active = item.id === selectedFlavorId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedFlavorId(item.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left text-sm font-medium transition-all ${active
                          ? "border-rose-400 bg-rose-50/80 text-rose-900 shadow-sm scale-[1.02]"
                          : "border-stone-200 bg-white hover:border-rose-200 text-stone-700"
                        }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full shrink-0 ${item.swatch} ring-2 ring-white shadow-sm`}
                      />
                      <span className="truncate">
                        {item.emoji} {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cake Text Input */}
            <div className="space-y-2">
              <label
                htmlFor="cake-plaque-input"
                className="text-xs font-bold uppercase tracking-wider text-stone-500 block"
              >
                2. Viết chữ lên bảng socola
              </label>
              <input
                id="cake-plaque-input"
                type="text"
                maxLength={24}
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                placeholder="VD: Tri Ân Cô Giang 20/11"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none text-sm font-medium text-stone-800 transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                3. Tương tác với chiếc bánh
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {!allBlownOut ? (
                  <button
                    type="button"
                    onClick={blowOutAll}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-md hover:shadow-rose-200 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Wind className="w-4 h-4" />
                    <span>Thổi Tắt Nến</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={relightCandles}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>Thắp Lại Nến</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCutSlice}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Utensils className="w-4 h-4" />
                  <span>{sliceTaken ? "Cất Miếng Bánh" : "Cắt Một Miếng 🍰"}</span>
                </button>
              </div>

              {/* Camera face-pucker blow option */}
              {!allBlownOut && (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={toggleCamera}
                    disabled={camLoading}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm border transition-all ${camActive
                        ? "bg-teal-50 border-teal-300 text-teal-800"
                        : "bg-white border-stone-200 hover:border-teal-300 text-stone-700"
                      } disabled:opacity-60`}
                  >
                    {camLoading ? (
                      <>
                        <Camera className="w-4 h-4 text-teal-600 animate-pulse" />
                        <span>Đang tải nhận diện khuôn mặt...</span>
                      </>
                    ) : camActive ? (
                      <>
                        <CameraOff className="w-4 h-4 text-teal-600" />
                        <span>Tắt Camera (Đang chờ bạn chu mỏ 😗)</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 text-teal-600" />
                        <span>Chu mỏ trước Camera để thổi nến 😗📷</span>
                      </>
                    )}
                  </button>

                  {camActive && (
                    <div className="rounded-2xl overflow-hidden border border-teal-200 bg-stone-900 relative">
                      <video
                        ref={videoRef}
                        muted
                        playsInline
                        className="w-full h-44 object-cover -scale-x-100"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-white font-medium">
                          <span>
                            {!faceDetected
                              ? "👀 Đưa khuôn mặt vào khung hình..."
                              : puckerLevel >= 65
                                ? "💨 Đang thổi... giữ chút nữa!"
                                : "😗 Hãy chu mỏ lên để thổi nến!"}
                          </span>
                          <span className="tabular-nums text-teal-300">
                            {puckerLevel}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-400 to-rose-500 transition-all duration-75"
                            style={{ width: `${puckerLevel}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {camError && (
                    <p className="text-xs text-rose-600">{camError}</p>
                  )}
                </div>
              )}

              {sliceTaken && (
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500 shrink-0" />
                    Đã mời cô phần bánh ngọt ngào nhất!
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      relightCandles();
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-rose-600 hover:underline ml-2 shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Làm lại
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

