"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Notes frequencies in Hz
  const notes: { [key: string]: number } = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    G5: 783.99,
  };

  // Gentle melody resembling peaceful piano tribute chords
  const melody = [
    { note: "E4", duration: 0.6 },
    { note: "G4", duration: 0.6 },
    { note: "C5", duration: 0.8 },
    { note: "D5", duration: 0.5 },
    { note: "E5", duration: 1.0 },
    { note: "D5", duration: 0.5 },
    { note: "C5", duration: 0.8 },
    { note: "A4", duration: 0.8 },
    { note: "G4", duration: 1.2 },
    // phrase 2
    { note: "A4", duration: 0.5 },
    { note: "C5", duration: 0.5 },
    { note: "E5", duration: 0.8 },
    { note: "D5", duration: 0.6 },
    { note: "C5", duration: 1.0 },
    { note: "G4", duration: 0.8 },
    { note: "E4", duration: 0.8 },
    { note: "D4", duration: 0.8 },
    { note: "C4", duration: 1.4 },
  ];

  const playNote = (ctx: AudioContext, freq: number, duration: number, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle sine / warm triangle waveform
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Warm bell/piano envelope
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    // Subtle reverb/low-pass warmth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, time);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  };

  const startMusicLoop = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      let currentTime = ctx.currentTime + 0.1;
      let totalTime = 0;

      melody.forEach((item) => {
        const freq = notes[item.note] || 440;
        playNote(ctx, freq, item.duration * 1.5, currentTime);
        currentTime += item.duration;
        totalTime += item.duration;
      });

      // Loop after melody ends
      timerRef.current = setTimeout(() => {
        if (isPlaying) {
          startMusicLoop();
        }
      }, totalTime * 1000);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startMusicLoop();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 font-medium text-sm group ${
        isPlaying
          ? "bg-rose-500 text-white shadow-rose-300 ring-4 ring-rose-200"
          : "bg-white/90 backdrop-blur-md text-stone-700 hover:text-rose-600 shadow-stone-200 hover:shadow-rose-100 border border-stone-200/60"
      }`}
      title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc tri ân du dương"}
    >
      <div className="relative">
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 animate-pulse text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
          </>
        ) : (
          <VolumeX className="w-5 h-5 text-stone-500 group-hover:text-rose-500 transition-colors" />
        )}
      </div>
      <span className="hidden sm:inline">
        {isPlaying ? "Giai điệu tri ân 🎵" : "Bật nhạc nền 🎵"}
      </span>
      {isPlaying && (
        <span className="flex items-center gap-0.5">
          <span className="w-1 h-3 bg-white rounded-full animate-bounce"></span>
          <span className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </span>
      )}
    </button>
  );
}

