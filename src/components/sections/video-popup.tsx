"use client";

import { useState, useEffect } from "react";

export function VideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    const timer = setTimeout(() => setIsAnimating(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#14212b]/85 backdrop-blur-md transition-opacity duration-300 p-4 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl bg-[#14212b] rounded-3xl overflow-hidden border border-[#35a8e0]/30 shadow-[0_20px_50px_rgba(5,117,106,0.3)] transition-all duration-300 transform ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#14212b] via-[#05756a]/30 to-[#14212b] border-b border-[#35a8e0]/20">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ebbc17] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-[#35a8e0] uppercase">
              Official Promo Video
            </span>
          </div>

          {/* Close (Cut) Button */}
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-[#35a8e0]/10 hover:bg-[#ebbc17] text-[#35a8e0] hover:text-[#14212b] font-bold flex items-center justify-center text-lg transition-all duration-200 border border-[#35a8e0]/30 hover:border-[#ebbc17]"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black">
          <video
            autoPlay
            muted
            loop
            controls
            playsInline
            className="w-full h-full object-contain"
          >
            <source src="/media/Nepal-Electronic-Final.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-5 sm:p-6 bg-[#14212b] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#35a8e0]/20">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              5th Nepal Electric, Power & Lights Expo 2026
            </h3>
            <p className="text-xs sm:text-sm text-[#35a8e0] mt-0.5">
              4-6 September 2026 | Bhrikuti Mandap, Kathmandu
            </p>
          </div>

          <a
            href="/book-a-stand"
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-[#ebbc17] to-[#c99f0f] hover:from-[#35a8e0] hover:to-[#2688b8] text-[#14212b] hover:text-white font-bold rounded-xl text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Register as Exhibitor
          </a>
        </div>
      </div>
    </div>
  );
}