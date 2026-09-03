import React, { useState, useRef, useCallback } from 'react';
import { RotateCw, Compass, ShieldCheck, Eye } from 'lucide-react';

interface Vehicle360ViewerProps {
  vehicleName: string;
  vehicleType: 'petrol' | 'ev';
  baseImage: string;
  badge: string;
}

export function Vehicle360Viewer({
  vehicleName,
  vehicleType,
  baseImage,
  badge,
}: Vehicle360ViewerProps) {
  const [frame, setFrame] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startFrame, setStartFrame] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalFrames = 24;
  const currentAngle = Math.round((frame / totalFrames) * 360);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartFrame(frame);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      // Sensitivity: roughly 12px per frame
      const framesMoved = Math.floor(deltaX / 12);
      let nextFrame = (startFrame + framesMoved) % totalFrames;
      if (nextFrame < 0) nextFrame += totalFrames;
      setFrame(nextFrame);
    } else if (containerRef.current) {
      // Hover scrubbing when not dragging
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const calculatedFrame = Math.floor((relativeX / rect.width) * totalFrames) % totalFrames;
      setFrame(calculatedFrame);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Optical perspective offset based on current frame to simulate 3D rotation feel
  const opticalSkew = Math.sin((frame / totalFrames) * 2 * Math.PI) * 4;
  const opticalScale = 1 + Math.cos((frame / totalFrames) * 2 * Math.PI) * 0.04;

  return (
    <div className="w-full flex flex-col gap-2.5 select-none text-left">
      {/* Viewer Stage Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-300 shadow-inner cursor-ew-resize group"
      >
        {/* Dynamic Vehicle Render with simulated progressive inspection */}
        <div
          className="relative w-full h-full transition-transform duration-75 ease-out"
          style={{
            transform: `perspective(800px) scale(${opticalScale}) skewY(${opticalSkew * 0.3}deg)`,
          }}
        >
          <img
            src={baseImage}
            alt={`${vehicleName} Inspection`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-105"
            draggable={false}
          />
          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span
            className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded ${
              vehicleType === 'ev'
                ? 'bg-[#E3FF00] text-black shadow-sm'
                : 'bg-red-600 text-white shadow-sm'
            }`}
          >
            {badge}
          </span>

          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-zinc-300">
            <Compass size={11} className={vehicleType === 'ev' ? 'text-[#E3FF00]' : 'text-red-400'} />
            <span>{currentAngle}° ANGLE</span>
          </div>
        </div>

        {/* Center Turntable Ring Indicator */}
        <div className="absolute inset-x-0 bottom-10 flex items-center justify-center pointer-events-none z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/85 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-[11px] font-bold text-white tracking-wider uppercase">
            <RotateCw size={12} className={`animate-spin-slow ${vehicleType === 'ev' ? 'text-[#E3FF00]' : 'text-red-400'}`} />
            <span>FRAME {frame + 1} / {totalFrames}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300">{currentAngle}° PERSPECTIVE</span>
          </div>
        </div>

        {/* Honest interaction label */}
        <div className="absolute bottom-2 inset-x-3 flex items-center justify-between pointer-events-none z-10 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
          <div className="flex items-center gap-1.5">
            <Eye size={11} className={vehicleType === 'ev' ? 'text-[#E3FF00]' : 'text-red-400'} />
            <span className="text-white font-medium">Hover to preview perspective tilt</span>
          </div>
          <span className="font-semibold text-zinc-400">LIVE PREVIEW</span>
        </div>
      </div>
    </div>
  );
}
